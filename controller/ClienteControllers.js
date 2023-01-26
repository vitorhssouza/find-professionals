const { where } = require("sequelize")
const Clientes = require("../model/Clientes")
const Endereco = require("../model/Endereco")
const Prestadores = require('../model/Prestadores')
const Profissoes = require("../model/Profissoes")
const Servicos = require("../model/Servicos")
const { Op } = require('sequelize');

class ClientesControllers{
    static async clienteHome(req, res){
        const id_clientes = req.session.userIdCliente
        const filtro = req.query.filtro;
        const pesquisa = req.query.pesquisar;

        if(filtro == 1){
            const cliente = await Clientes.findOne({raw: true, where:{id_clientes: id_clientes}})

            const prestadores = await Prestadores.findAll({
                raw: true,
                include: {model: Profissoes},
                where: {nome: {[Op.like]: `%${pesquisa}%`}}
            });

            res.render('clientes/homeClientes', {layout: false, cliente, prestadores})

        }else if(filtro == 2){
            const cliente = await Clientes.findOne({raw: true, where:{id_clientes: id_clientes}})

            const prestadores = await Prestadores.findAll({
                raw: true,
                include: {
                    model: Profissoes,
                    where: {descricao: {[Op.like]: `%${pesquisa}%`}}
                }     
            });
        
            res.render('clientes/homeClientes', {layout: false, cliente, prestadores})

        }else{
            const cliente = await Clientes.findOne({raw: true, where:{id_clientes: id_clientes}})
            const prestadores = await Prestadores.findAll({
                raw: true,
                include: {model: Profissoes}
            })

            
            res.render('clientes/homeClientes', {layout: false, cliente, prestadores})
        };
        
        
    };

    // Método para mostrar perfil
    static async perfil(req, res){
        const id_clientes = req.session.userIdCliente;
        const cliente = await Clientes.findOne({
            raw: true,
            include: {model: Endereco},
            where:{id_clientes: id_clientes}
        });

        res.render('clientes/perfil', {layout: false, cliente})
    };

    // Metodo para editar clientes
    static async edit(req, res){{
        const id = req.session.userIdCliente
        const cliente = await Clientes.findOne({
            raw: true,
            include: {model: Endereco},
            where:{id_clientes: id}
        });
        res.render('clientes/edit', {layout: false, cliente})
    }};

    // Método que salvar a edição de clientes
    static async editSave(req, res){
        const id = req.session.userIdCliente;
        const nome = req.body.nome;
        const sobrenome = req.body.sobrenome;
        const cpf = req.body.cpf;
        const contato = req.body.contato;
        const logadouro = req.body.endereco;
        const numero = req.body.numero;
        const bairro = req.body.bairro;
        const cidade = req.body.cidade;
        const cep = req.body.cep;
        const estado = req.body.estado;

        const cliente = await Clientes.findOne({raw: true, where: {id_clientes: id}})

        try{
            const editEndereco = await Endereco.update(
                {logadouro, numero, bairro, cidade, cep, estado},
                {where: {id_endereco: cliente.id_endereco}}
                );
            
            const editCliente = await Clientes.update(
                {nome, sobrenome, cpf, contato},
                {where: {id_clientes: id}}
                );
            res.redirect('/homeCliente/perfil')
        }catch (error){
            console.log(error)
        }     

    };

    // Método de detalhes de prestador
    static async detahes(req, res){
        const id = req.params.id_prestadores;

        const prestador = await Prestadores.findOne({
            raw: true,
            include: {model: Endereco},
            where: {id_prestadores: id}
        })

        res.render('clientes/detalhes', {layout: false, prestador})

    };

    // Método de contratar prestador
    static async contratar(req, res){
        const id = req.params.id_prestador;
        //const id_cliente = req.session.userIdCliente;

        const prestador = await Prestadores.findOne({
            raw: true,
            include: {model: Profissoes},
            where: {id_prestadores: id}
        })
        res.render('clientes/contratar', {layout: false, prestador});
    };;

    // Método de salvar contratação de serviço
    static async contratarSave(req, res){
        const id_cliente = req.session.userIdCliente;
        const id_prestador = req.params.id_prestador;
        const descricao = req.body.descricao

        try {
            await Servicos.create({descricao, status: false, id_prestadores: id_prestador, id_clientes: id_cliente})
            console.log('salvo no banco')
        } catch (error) {
            console.log(error)  
        }

        res.redirect('/homeCliente')
    };

    // Metodo que visualiza o historico de contratação de serviço
    static async historico(req, res){
        const id_cliente = req.session.userIdCliente;

        const cliente = await Clientes.findAll({
            raw: true,
            include: {
                model: Servicos,
                include: {
                    model: Prestadores,
                    include: {model: Profissoes}
                }
            },
            where: {id_clientes: id_cliente}
        })

        res.render('clientes/historico', {layout: false, cliente})
    }



}

module.exports = ClientesControllers