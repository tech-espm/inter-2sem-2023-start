import app = require('teem')
const { storage } = require('../services/firebase');

interface UserPost {
     id: number;
     contentText: string;
     contentImage?: File;
     date: Date;
     userId: number;
     userName: string;
     userPhoto: string;
     specialPost?: boolean;
}

interface DeletePost {
     postId: number;
     userId: number;
}

class UserPost {
     public async index(req: app.Request, res: app.Response) {
          res.send("Testando");
     }

     @app.http.get()
     public async getAllPosts(req: app.Request, res: app.Response) {
          await app.sql.connect(async (sql) => {
               const posts = await sql.query(`
                    select
                         p.Id_post,
                         p.Conteudo_Texto,
                         p.Conteudo_Imagem,
                         p.isImage,
                         p.Data_post,
                         p.Id_user,
                         p.Likes,
                         u.User as userName,
                         u.Foto as userPhoto,
                         c.id as Id_comentario,
                         c.postId as comentarioPostId,
                         c.comentarios as comentarioConteudo,
                         c.userName as comentarioUserName,
                         c.userId as comentarioUserId
                    from
                         post p
                         inner join usuario u on u.Id_user = p.Id_user
                         left join comentarios c on c.postId = p.Id_post
                    order by
                         p.Data_post desc
               `);

               const postsArray = posts.map((post: any) => {
                    return {
                         id: post.Id_post,
                         contentText: post.Conteudo_Texto,
                         contentImage: post.Conteudo_Imagem ? post.Conteudo_Imagem.toString() : null,
                         isImage: post.isImage,
                         date: post.Data_post,
                         userId: post.Id_user,
                         userName: post.userName,
                         userPhoto: post.userPhoto,
                         likes: post.Likes,
                         comments: {
                              id: post.Id_comentario,
                              postId: post.comentarioPostId,
                              content: post.comentarioConteudo,
                              userName: post.comentarioUserName,
                              userId: post.comentarioUserId,
                         }
                    }
               });

               res.send(postsArray);
          });
     }

     @app.http.post()
     public async like(req: app.Request, res: app.Response) {
          const like = {
               postId: req.body.postId,
               userId: req.body.userId,
          }

          await app.sql.connect(async (sql) => {
               const selectQuery = `
                    select 
                         Likes
                    from 
                         post
                    where 
                         Id_post = ?
               `;

               const selectResult = await sql.query(selectQuery, [like.postId]);
               const currentLikes = (selectResult[0] as any).Likes;

               const updateQuery = `
                    update post
                    set Likes = ?
                    where Id_post = ?
               `;

               const newLikes = currentLikes + 1;
               const updateResult = await sql.query(updateQuery, [newLikes, like.postId]);

               res.send(updateResult);
          });
     }

     @app.http.post()
     public async create(req: app.Request, res: app.Response) {
          let userPost = {
               contentText: req.body.contentText,
               contentImage: req.body.contentImage,
               isImage: req.body.isImage,
               userId: req.body.userId,
          }

          await app.sql.connect(async (sql) => {
               const insertQuery = `
                    insert into
                         post(
                              Id_user,
                              Conteudo_Texto,
                              Conteudo_Imagem,
                              isImage
                         )
                    values(
                         ?,
                         ?,
                         ?,
                         ?
                    )
               `;

               const result = await sql.query(insertQuery, [
                    userPost.userId,
                    userPost.contentText,
                    userPost.contentImage,
                    userPost.isImage
               ]);

               res.send(result);
          });
     }

     @app.http.delete()
     public async delete(req: app.Request, res: app.Response) {
          let deletePost: DeletePost = {
               postId: Number(req.query.postId),
               userId: Number(req.query.userId),
          }

          await app.sql.connect(async (sql) => {
               const checkQuery = `
                    select Id_user
                    from post
                    where Id_post = ?
               `;

               const checkResult = await sql.query(checkQuery, [deletePost.postId]);

               if (checkResult.length > 0 && (checkResult[0] as any).Id_user === deletePost.userId) {
                    const deleteQuery = `
                         delete from post
                         where Id_post = ? and Id_user = ?
                    `;

                    const result = await sql.query(deleteQuery, [deletePost.postId, deletePost.userId]);

                    res.send(result);
               } else {
                    res.status(403).send("Não foi possivel remover esse post.");
               }
          });

          res.send(deletePost);
     }

     @app.http.post()
     public async comment(req: app.Request, res: app.Response) {
          const comment = {
               commentText: req.body.comment,
               postId: req.body.postId,
               userId: req.body.userId,
               userName: req.body.userName,
          };


          await app.sql.connect(async (sql) => {
               const insertQuery = `
                    insert into
                         comentarios(
                              postId,
                              userId,
                              userName,
                              comentarios
                         )
                    values(
                         ?,
                         ?,
                         ?,
                         ?
                    )
               `;

               const result = await sql.query(insertQuery, [
                    comment.postId,
                    comment.userId,
                    comment.userName,
                    comment.commentText
               ]);


               const updateQuery = `
                    update post
                    set Comentarios = Comentarios + 1
                    where Id_post = ?
               `;

               const updateResult = await sql.query(updateQuery, [comment.postId]);

               res.send(result);
          })
     }


     @app.http.post()
     public async getComments(req: app.Request, res: app.Response) {
          const postId = req.body.postId;

          await app.sql.connect(async (sql) => {
               const selectQuery = `
                    select
                         *
                    from
                         comentarios
                    where
                         postId = ?
               `;

               const selectResult = await sql.query(selectQuery, [postId]);

               res.send(selectResult);
          });
     }
}


export = UserPost;