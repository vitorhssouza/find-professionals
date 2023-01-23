const Clientes = require("../model/Clientes")
const Endereco = require("../model/Endereco")
const Prestadores = require('../model/Prestadores')

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

    // Mostra todos os prestadores 
    static async prestadores(req, res){
        const prestadores = await Prestadores.findAll({
            raw: true
        });
        res.render('admin/prestadores', {layout: false, prestadores})
    };

    // Rota de detalhes de prestadores
    static async detalhesPrestadores(req, res){
        const id_prestador = req.params.id_prestadores;

        const prestador = await Prestadores.findOne({
            raw: true, 
            include: {model: Endereco},
            where: {id_prestadores: id_prestador}
        });

        res.render('admin/detalhesPrestadores', {layout: false, prestador});
    };

    // Rota de excluir clientes
    static async excluirCliente(req, res){
        const id = req.params.id_clientes

        await Clientes.destroy({where: {id_clientes: id}})
        console.log('Cliente excluído com sucesso')
        res.redirect('/admin/clientes')
    };

    // Método para excluir profissional 
    static async excluirPrestador(req, res){
        const id = req.params.id_prestadores

        await Prestadores.destroy({where: {id_prestadores: id}})
        console.log('Prestador excluído com sucesso')
        res.redirect('/admin/prestadores')
    };

}


module.exports = AdminControllers