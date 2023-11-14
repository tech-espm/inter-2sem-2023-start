class Usuario {
     id: number;
     name: string;
     nm_anonimo?: string;
     isAnonimo: number;
     idade: number;
     photoURL?: string;
     email: string;
     password: string;
     isVerified: number;

     constructor(user: {
          id: number;
          name: string;
          nm_anonimo: string;
          isAnonimo: number;
          idade: number;
          photoURL?: string;
          email: string;
          password: string;
          isVerified: number;
     }) {
          this.id = user.id;
          this.name = user.name;
          this.nm_anonimo = user.nm_anonimo;
          this.isAnonimo = user.isAnonimo;
          this.idade = user.idade;
          this.photoURL = user.photoURL;
          this.email = user.email;
          this.password = user.password;
          this.isVerified = user.isVerified;
     }

     validar() {
          if (!this.name || typeof this.name !== "string") {
               throw new Error("O campo 'name' é obrigatório e deve ser uma string.");
          }

          if (this.nm_anonimo && typeof this.nm_anonimo !== "string") {
               throw new Error("O campo 'nm_anonimo' deve ser uma string.");
          }

          if (typeof this.isAnonimo !== "number" || (this.isAnonimo !== 0 && this.isAnonimo !== 1)) {
               throw new Error("O campo 'isAnonimo' é obrigatório e deve ser 0 ou 1.");
          }

          if (!this.idade || typeof this.idade !== "number") {
               throw new Error("O campo 'idade' é obrigatório e deve ser um número.");
          }

          if (!this.email || typeof this.email !== "string") {
               throw new Error("O campo 'email' é obrigatório e deve ser uma string.");
          }

          if (!this.password || typeof this.password !== "string") {
               throw new Error("O campo 'password' é obrigatório e deve ser uma string.");
          }

          if (typeof this.isVerified !== "number" || (this.isVerified !== 0 && this.isVerified !== 1)) {
               throw new Error("O campo 'isVerified' é obrigatório e deve ser 0 ou 1.");
          }
     }
}

export default Usuario;
