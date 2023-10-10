import app = require("teem");

interface UserData {
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

class User {
     public async index(req: app.Request, res: app.Response) {
          res.send("Testando");
     }

     @app.http.post()
     public async create(req: app.Request, res: app.Response) {
          let user: UserData = req.body;

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
          });

          res.json("Testando");
     }

}

export = User;
