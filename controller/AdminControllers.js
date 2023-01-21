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


}


module.exports = AdminControllers