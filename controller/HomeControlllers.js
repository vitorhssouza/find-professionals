const Endereco = require('../model/Endereco')
const Prestadores = require('../model/Prestadores')
const Clientes = require('../model/Clientes')

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

    static async cadastroSave(req, res){

        let nome = req.body.nome;
        const sobrenome = req.body.nome;
        const cpf = req.body.cpf;
        const contato = req.body.contato;
        const logadouro = req.body.endereco;
        const numero = req.body.numero;
        const bairro = req.body.bairro;
        const cidade = req.body.cidade;
        const cep = req.body.cep;
        const estado = req.body.estado;
        const usuario = req.body.usuario;
        const email = req.body.email;
        const senha = req.body.senha;
        const confirmaSenha = req.body.senhaConfirme

        const userCliente = await Clientes.findOne({where: {email: email, cpf: cpf}})
        const userPrestador = await Prestadores.findOne({where: {email: email, cpf_cnpj: cpf}})

        // Verificação de senha 
        if(senha != confirmaSenha){
            console.log('Senha incorretas!')
            res.redirect('/cadastro');
        }else if(userCliente){
            console.log('Esse cliente já existe')
            res.redirect('/login')
        }else if(userPrestador){
            console.log('Esse prestador já existe')
            res.redirect('/login')
        }else{
            // Salvando os dados no banco
            const teste =  await Endereco.create({
                logadouro, numero, bairro, cidade, cep, estado
            })

            const endereco = await Endereco.findOne({raw: true, where:{id_endereco: teste.id_endereco}})

            const salt = bcrypt.genSaltSync(10);
            const senhaCriptografada = bcrypt.hashSync(senha, salt);

            if (usuario == 'Cliente'){
                await Clientes.create({
                    nome, sobrenome, cpf, contato, email, senha: senhaCriptografada, id_endereco: endereco.id_endereco
                });
                console.log('Cadastrado')
                res.redirect('/login')
            }else{
                await Prestadores.create({
                    nome, sobrenome, cpf_cnpj: cpf, contato, email, senha: senhaCriptografada, id_endereco: endereco.id_endereco
                });
                console.log('Cadastrado')
                res.redirect('/login')
                
            }
        };

        
        
    }

    static loginVerificar(req, res){
        
        console.log(req.body)

    }


}

module.exports = HomeController
