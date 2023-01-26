const Prestadores = require('../model/Prestadores')
const Clientes = require('../model/Clientes')
const Servico = require('../model/Servicos')
const Endereco = require('../model/Endereco')

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

        res.render('prestadores/homePrestador', {layout: false, prestador, cliente});
    };

    static async detalhes(req, res){
        const id_cliente = req.params.id_clientes;
        const id_servico = req.params.id_servico;

        const cliente = await Clientes.findOne({
            raw: true,
            include: {model: Endereco},
            where: {id_clientes: id_cliente}
        });

        const servico = await Servico.findOne({
            raw: true,
            where: {id_servico: id_servico, status: false}
        });

        cliente.servico = servico.descricao;
        cliente.data = servico.createdAt

        res.render('prestadores/detalhes', {layout: false, cliente, id_servico})

    };

    // Método de aceitar servico 
    static async aceitar(req, res){
        const id_servico = req.params.id_servico;

        try {
            await Servico.update({status: true},{where: {id_servico: id_servico}})
            console.log('Serviço aceito')
        } catch (error) {
            console.log(error)
        }
        res.redirect('/homePrestador')
    };

}


module.exports = PrestadorControllers;
