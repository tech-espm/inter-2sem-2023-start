import app = require('teem')
const { storage } = require('../services/firebase');
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';

interface Post {
     id: number;
     content: string;
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

     @app.http.post()
     public async create(req: app.Request, res: app.Response) {
          let userPost: Post = {
               id: Number(req.body.id),
               content: req.body.content as string,
               date: new Date(req.body.date as string),
               userId: Number(req.body.userId),
               userName: req.body.userName as string,
               userPhoto: req.body.userPhoto as string,
          }

          const storageRef = ref(storage, `${userPost.userId}/${userPost.id}`);
          const upload = uploadBytesResumable(storageRef, req.body.content);

          upload.on(
               "state_changed",
               (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log("Enviando post para o db: " + progress + "%")
               },
               (error) => {
                    console.error(error);
               },
               () => {
                    getDownloadURL(upload.snapshot.ref).then((downloadURL) => {
                         console.log("Download do arquivo", downloadURL);
                    });
               }
          )

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