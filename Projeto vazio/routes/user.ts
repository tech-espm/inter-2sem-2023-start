import app = require("teem")

class User {
     public async index(req: app.Request, res: app.Response) {
          res.send("Testando");
     }
}

export = User;