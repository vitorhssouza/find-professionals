const { where } = require("sequelize")
const Clientes = require("../model/Clientes")
const Endereco = require("../model/Endereco")
const Prestadores = require('../model/Prestadores')
const Profissoes = require("../model/Profissoes")
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
            })

            console.log(prestadores)
            res.render('clientes/homeClientes', {layout: false, cliente, prestadores})

        }else if(filtro == 2){
            const cliente = await Clientes.findOne({raw: true, where:{id_clientes: id_clientes}})

            const profissao = await Profissoes.findAll({
                raw: true,
                include: {model: Prestadores},
                where: {descricao: {[Op.like]: `%${pesquisa}%`}}
            })

            console.log(profissao)
            res.render('clientes/homeClientes', {layout: false, cliente, profissao})

        }else{
            const cliente = await Clientes.findOne({raw: true, where:{id_clientes: id_clientes}})
            const prestadores = await Prestadores.findAll({
                raw: true,
                include: {model: Profissoes},
                where: {nome: {[Op.like]: `%${pesquisa}%`}}
            })

            console.log(prestadores)
            res.render('clientes/homeClientes', {layout: false, cliente, prestadores})
        }
        
        
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

}

module.exports = ClientesControllers