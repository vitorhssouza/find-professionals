const { Router } = require('express');
const express = require('express');
const router = express.Router();
const AdminControllers = require('../controller/AdminControllers')
const {checarLogadoAdmin} = require('../helper/authLoginAdmin')

// Rota do menu admin
router.get('/adminhome', checarLogadoAdmin, AdminControllers.adminHome)

// Rota do menu administrador que listra todos os cliente
router.get('/admin/clientes', checarLogadoAdmin, AdminControllers.clientes)

// Rota de detalhe de cliente
router.get('/admin/detalhes/clientes/:id_clientes', checarLogadoAdmin, AdminControllers.detalhes)

// Rota do menu admintrador que listra todos os prestadores
router.get('/admin/prestadores', checarLogadoAdmin, AdminControllers.prestadores)

// Rota de detalhes de prestador
router.get('/admin/detalhes/prestador/:id_prestadores', checarLogadoAdmin, AdminControllers.detalhesPrestadores)


// Rota de excluir clientes
router.get('/admin/delete/clientes/:id_clientes', checarLogadoAdmin, AdminControllers.excluirCliente)

// // Rota de excluir prestador
router.get('/admin/delete/prestador/:id_prestadores', checarLogadoAdmin, AdminControllers.excluirPrestador)


module.exports = router