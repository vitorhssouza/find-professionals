const bcrypt = require('bcryptjs');

class HomeController{
    static home(req, res){
        res.render('home')
    }

    static login(req, res){
        res.render('login')
    }

    static cadastro(req, res){
        res.render('cadastro')
    }

    static cadastroSave(req, res){

        //let nome = req.body.nome;
        //const sobrenome = req.body.nome;
        // const cpf = req.body.cpf;
        // const contato = req.body.contato;
        // const endereco = req.body.endereco;
        // const numero = req.body.numero;
        // const bairro = req.body.bairro;
        // const cidade = req.body.cidade;
        // const cep = req.body.cep;
        // const estado = req.body.estado;
        // const usuario = req.body.usuario;
        // const email = req.body.email;
        // const senha = req.body.senha;
        // const confirmaSenha = req.body.senhaConfirme

        console.log(nome)



    }

    static loginVerificar(req, res){
        const nome = req.body.email
        console.log(nome)
    }


}

module.exports = HomeController
