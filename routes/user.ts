import app = require("teem");
import Usuario from "../utils/validarUsuario";

type UserData = {
     id: number;
     name: string;
     nm_anonimo?: string;
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

class User {
     public async index(req: app.Request, res: app.Response) {
          res.send("Testando");
     }

     @app.http.post()
     public async create(req: app.Request, res: app.Response) {
          let user: UserData = req.body;

          let userValidation = new Usuario(user);
          userValidation.validar();

          await app.sql.connect(async (sql) => {
               const insertQuery = `
                    insert into
                         usuario (
                              Id_user,
                              Nm_user,
                              Nm_Anom,
                              isAnom,
                              Idade,
                              Foto,
                              Email,
                              Senha,
                              isVerified
                         )
                         values (?, ?, ?, ?, ?, ?, ?, ?, ?)
               `;

               await sql.query(insertQuery, [user.id, user.name, user.nm_anonimo, user.isAnonimo, user.idade, user.photoURL, user.email, user.password, user.isVerified]);
               console.log("Usuário criado com sucesso!");
          });

          res.json("Testando");
     }

     @app.http.post()
     public async login(req: app.Request, res: app.Response) {
          let user: LoginData = req.body;

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
               console.log("Usuário logado");
               res.json(result);
          });
     }


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
               res.json(result);
          });
     }

}

export = User;
