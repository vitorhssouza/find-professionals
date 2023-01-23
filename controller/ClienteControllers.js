const Clientes = require("../model/Clientes")
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
    }
}

module.exports = ClientesControllers