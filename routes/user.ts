import app = require("teem");
import Usuario from "../utils/validarUsuario";

type UserData = {
     id?: number;
     name: string;
     user: string;
     isAnonimo: number;
     idade: number;
     photoURL?: string;
     email: string;
     password: string;
     isVerified: number;
}

type LoginData = {
     email: string;
     password: string;
}

/**
 * Representa uma classe de Usuário com rotas para criar, pesquisar e fazer login de usuários.
 */
class User {
     /**
      * Rota para obter todos os usuários.
      * @param req - O objeto de solicitação.
      * @param res - O objeto de resposta.
      */
     public async index(req: app.Request, res: app.Response) {
          res.send("Testando");
     }

     /**
      * Rota para criar um novo usuário.
      * @param req - O objeto de solicitação.
      * @param res - O objeto de resposta.
      */
     @app.http.post()
     public async create(req: app.Request, res: app.Response) {
          let user: UserData = req.body;

          console.log(user)

          await app.sql.connect(async (sql) => {
               const selectQuery = `
                    select                                        
                         *
                    from
                         usuario
                    where
                         User = ? or Email = ?
               `;

               const result = await sql.query(selectQuery, [user.name, user.email]);

               if (result.length > 0) {
                    res.status(409).json({ message: "Usuário já existe" });
               } else {
                    const insertQuery = `
                         insert into
                              usuario (
                                   Nm_user,
                                   User,
                                   isAnom,
                                   Idade,
                                   Foto,
                                   Email,
                                   Senha,
                                   isVerified
                              )
                              values (?, ?, ?, ?, ?, ?, ?, ?)
                    `;

                    const result = await sql.query(insertQuery, [user.name, user.user, user.isAnonimo, user.idade, user.photoURL, user.email, user.password, user.isVerified]);
                    if (result.length === 0) {
                         console.log("Usuário não criado");
                    }
                    console.log("Usuário criado com sucesso!");
                    res.json("Testando");
               }
          });
     }

     /**
      * Rota para fazer login de um usuário.
      * @param req - O objeto de solicitação.
      * @param res - O objeto de resposta.
      */

     @app.http.post()
     public async login(req: app.Request, res: app.Response) {
          let user: LoginData = req.body;

          console.log("Recebi: ", user.email, user.password);

          await app.sql.connect(async (sql) => {
               const selectQuery = `
                    select                                        
                         *
                    from
                         usuario
                    where
                         Email = ? and Senha = ?
               `;

               const result = await sql.query(selectQuery, [user.email, user.password]);
               console.log(result)
               if (result.length === 0) {
                    console.log("Usuário não encontrado");
                    res.status(404).json({ error: "Usuário não encontrado" });
               } else {
                    console.log("Usuário encontrado");
                    res.status(200).json(result[0]);
               }
          });
     }

     /**
      * Rota para pesquisar um usuário por ID.
      * @param req - O objeto de solicitação.
      * @param res - O objeto de resposta.
      */

     @app.http.get()
     public async search(req: app.Request, res: app.Response) {
          let search = req.query.id

          await app.sql.connect(async (sql) => {
               const selectQuery = `
               select                                        
                    *
               from
                    usuario
               where
                    Id_user = ?
               `;

               const result = await sql.query(selectQuery, [search]);
               console.log("Usuário lido com sucesso!");

               const userId = (result[0] as { Id_user: number }).Id_user;

               const selectPostsQuery = `
                  select
                       *,
                       Conteudo_Imagem as contentImage
                  from
                       post
                  where
                       Id_user = ?
               `;

               const posts = await sql.query(selectPostsQuery, [userId]);
               console.log("Posts do usuário lidos com sucesso!");

               const formattedPosts = posts.map((post: any) => ({
                    ...post,
                    contentImage: post.Conteudo_Imagem ? post.Conteudo_Imagem.toString() : null
               }));

               res.json({ user: result[0], posts: formattedPosts });
          });
     }

     /**
      * Rota para gerar um usuário anônimo.
      * @param req - O objeto de solicitação.
      * @param res - O objeto de resposta.
      */
     @app.http.get()
     public async gerarAnonimo(req: app.Request, res: app.Response) {
          const lista_nomes = []
          await app.sql.connect(async (sql) => {
               const selectQuery = `
                    select                                        
                         Nm_Anom as nome
                    from
                         nm_anonimo
               `;

               const result = await sql.query(selectQuery);
               lista_nomes.push(...(result as { nome: string }[]).map(obj => obj.nome));
          });

          function sorteadorDeNome() {
               const nome = lista_nomes[Math.floor(Math.random() * lista_nomes.length)];
               let nomeFormatado = nome.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/ /g, "_").toLowerCase();
               if (nomeFormatado.length > 25) {
                    nomeFormatado = nomeFormatado.substring(0, 25);
               }
               const numeroRandom = Math.floor(Math.random() * 10000);
               return nomeFormatado + numeroRandom;
          }
          const nome = sorteadorDeNome()
          console.log(sorteadorDeNome())
          console.log(lista_nomes)
          console.log(nome)

          res.json(nome);
     }

     @app.http.put()
     public async update(req: app.Request, res: app.Response) {
     }
}

export = User;
