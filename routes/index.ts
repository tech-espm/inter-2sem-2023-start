import app = require("teem");

class IndexRoute {
	public async index(req: app.Request, res: app.Response) {
		let opcoes = {
			titulo: "Início"
		};

		res.render("index/index", opcoes);
	}

	public async sobrenos(req: app.Request, res: app.Response) {
		let opcoes = {
			titulo: "Sobre Nós"
		};

		res.render("index/sobrenos", opcoes);
	}

	public async cadastro(req: app.Request, res: app.Response) {
		let opcoes = {
			titulo: "Cadastro"
		};

		res.render("index/cadastro", opcoes);
	}

	public async login(req: app.Request, res: app.Response) {
		let opcoes = {
			titulo: "Login"
		};

		res.render("index/login", opcoes);
	}
}

export = IndexRoute;
