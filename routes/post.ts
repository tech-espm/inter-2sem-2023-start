import app = require('teem')

interface Post {
     id: number;
     content: string;
     conteinImage: boolean;
     date: Date;
     userId: number;
     userName: string;
     userPhoto: string;
     specialPost?: boolean;
}

interface DeletePost {
     postId: number;
     userId: number;
     date: Date;
}


class UserPost {
     public async index(req: app.Request, res: app.Response) {
          res.send("Testando");
     }

     public async create(req: app.Request, res: app.Response) {
          let userPost: Post = {
               id: Number(req.query.id),
               content: req.query.content as string,
               conteinImage: Boolean(req.query.conteinImage),
               date: new Date(req.query.date as string),
               userId: Number(req.query.userId),
               userName: req.query.userName as string,
               userPhoto: req.query.userPhoto as string,
          }

          res.send(userPost);
     }

     public async delete(req: app.Request, res: app.Response) {
          let deletePost: DeletePost = {
               postId: Number(req.query.postId),
               userId: Number(req.query.userId),
               date: new Date(req.query.date as string),
          }

          res.send(deletePost);
     }
}

export = UserPost;