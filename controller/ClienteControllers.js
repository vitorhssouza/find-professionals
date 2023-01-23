const Clientes = require("../model/Clientes")
const Endereco = require("../model/Endereco")
const Prestadores = require('../model/Prestadores')
const Profissoes = require("../model/Profissoes")

class ClientesControllers{
    static async clienteHome(req, res){
        const id_clientes = req.session.userIdCliente
        const cliente = await Clientes.findOne({raw: true, where:{id_clientes: id_clientes}})
        const prestadores = await Profissoes.findAll({
            raw: true,
            include: {model: Prestadores}
        });      

        res.render('clientes/homeClientes', {layout: false, cliente, prestadores})
    };

    static async perfil(req, res){
        const id_clientes = req.session.userIdCliente;
        const cliente = await Clientes.findOne({
            raw: true,
            include: {model: Endereco},
            where:{id_clientes: id_clientes}
        });

        res.render('clientes/perfil', {layout: false, cliente})
    }
}

module.exports = ClientesControllers