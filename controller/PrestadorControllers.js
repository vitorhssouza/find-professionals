const Prestadores = require('../model/Prestadores')
const Clientes = require('../model/Clientes')
const Servico = require('../model/Servicos')
const { and } = require('sequelize')

class PrestadorControllers{
    static async home(req, res){
        const id = req.session.userIdPrestador

        const prestador = await Prestadores.findOne({
            raw: true,
            where: {id_prestadores: id}
        })

        const cliente = await Clientes.findAll({
            raw: true,
            include: {
                model: Servico,
                where: {status: false, id_prestadores: id}
            }
        });

        console.log(cliente)

        res.render('prestadores/homePrestador', {layout: false, prestador, cliente});
    };
}


module.exports = PrestadorControllers;
