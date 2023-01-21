const Clientes = require("../model/Clientes")
const Endereco = require("../model/Endereco")

class AdminControllers{

    // Metodo home admin
    static adminHome(req, res){
        res.render('admin/homeAdmin', {layout: false})
    }

    // Metodo que lista todos os clientes para admin
    static async clientes(req, res){

        const clientes = await Clientes.findAll({
            raw: true,
            include: {
                model: Endereco
            }
        })

        res.render('admin/clientes', {layout: false, clientes})
    }

    // Métodos que mostra os detalhes do cliente
    static async detalhes(req, res){
        const id_clientes = req.params.id_clientes

        const clientes = await Clientes.findOne({
            raw: true,
            include: {model: Endereco},
            where: {id_clientes: id_clientes}
        })

        res.render('admin/detalhes', {layout: false, clientes})
    }
    static async prestadores(req, res){

    }


}


module.exports = AdminControllers