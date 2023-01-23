const Clientes = require("../model/Clientes")

class ClientesControllers{
    static async clienteHome(req, res){
        const id_clientes = req.session.userIdCliente
        const cliente = await Clientes.findOne({raw: true, where:{id_clientes: id_clientes}})
        res.render('clientes/homeClientes', {layout: false, cliente})
    }
}

module.exports = ClientesControllers