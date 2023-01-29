const Endereco = require('../model/Endereco')
const Prestadores = require('../model/Prestadores')
const Profissoes = require('../model/Profissoes')
const Clientes = require('../model/Clientes')

const { Op } = require('sequelize');

const bcrypt = require('bcryptjs');
const Administradores = require('../model/Admin');

class HomeController{
    
    // Método do menu
    static async home(req, res){

        const filtro = req.query.filtro;
        const pesquisa = req.query.pesquisar;
        let status = false

        if(filtro == 1){
            const prestadores = await Prestadores.findAll({
                raw: true,
                include: {model: Profissoes},
                where: {nome: {[Op.like]: `%${pesquisa}%`}}
            });

            status = true

            res.render('home', {prestadores, status})

        }else if(filtro == 2){
            const prestadores = await Prestadores.findAll({
                raw: true,
                include: {
                    model: Profissoes,
                    where: {descricao: {[Op.like]: `%${pesquisa}%`}}
                }     
            });

            status = true

            res.render('home', {prestadores, status})

        }else{
            const prestadores = await Prestadores.findAll({
                raw: true,
                include: {model: Profissoes}
            })

            res.render('home', {prestadores, status})
        }
    }

    static login(req, res){
        res.render('login')
    }

    static cadastro(req, res){
        res.render('cadastro')
    }

    // Método para salvar cadastro
    static async cadastroSave(req, res){

        let nome = req.body.nome;
        const sobrenome = req.body.sobrenome;
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
                console.log('Cadastrado Cliente');
                res.redirect('/login');
            }else if(usuario == 'Profissional'){
                await Prestadores.create({
                    nome, sobrenome, cpf_cnpj: cpf, contato, email, senha: senhaCriptografada, id_endereco: endereco.id_endereco
                });
                console.log('Cadastrado Profissional');
                res.redirect('/login');
                
            }else {
                console.log('Informe tipo de usuario');
                res.redirect('/cadastro');
            }
        };
        
    }

    // método para verificar login
    static async loginVerificar(req, res){
        
        const email = req.body.email;
        const senha = req.body.senha;

        const cliente = await Clientes.findOne({where: {email: email}});
        
        if(!cliente){
            const prestador = await Prestadores.findOne({where: {email: email}});
            if(prestador == null){
                const admin = await Administradores.findOne({where: {email: email}})          
                if(admin == null){
                    console.log('Usúario nao exite')
                    res.redirect('/cadastro')
                }else{
                    if(senha != admin.senha){
                        console.log('Senha incorreta');
                        res.redirect('/login')
                    }else{
                        req.session.userIdAdmin = admin.id_admin
                        req.session.save(()=>{
                            console.log('Fez o login de forma correta')
                            res.redirect('/adminhome')                    
                        })
                        //console.log('Logando')
                    }
                }
            }else{
                const senhaCadastrada = bcrypt.compareSync(senha, prestador.senha);
                if(!senhaCadastrada){
                    console.log('Senha incorreta');
                    res.redirect('/login')
                }else{
                    req.session.userIdPrestador = prestador.id_prestadores
                    req.session.save(()=>{
                    console.log('Fez o login de forma correta')
                    res.redirect('/homePrestador')                    
                })
                }
            }
        }else{
            const senhaC = bcrypt.compareSync(senha, cliente.senha);
            if(!senhaC){
                console.log('Senha incorreta');
                res.redirect('/login')
            }else{
                req.session.userIdCliente = cliente.id_clientes
                req.session.save(()=>{
                    console.log('Fez o login de forma correta')
                    res.redirect('/homeCliente')                    
                })
            } 
        }

    }

    static logout(req, res){
        if(req.session.userIdAdmin){
            req.session.destroy();
            res.redirect('/');
        }else if(req.session.userIdCliente){
            req.session.destroy();
            res.redirect('/');
        }else{
            req.session.destroy();
            res.redirect('/');
        }
    }

}

module.exports = HomeController
