const { Router } = require('express');
const express = require('express');
const router = express.Router();
const AdminControllers = require('../controller/AdminControllers')

// Rota do menu admin
router.get('/adminhome', AdminControllers.adminHome)

// Rota do menu administrador que listra todos os cliente
router.get('/admin/clientes', AdminControllers.clientes)

// Rota de detalhe de cliente
router.get('/admin/detalhes/clientes/:id_clientes', AdminControllers.detalhes)

// Rota do menu admintrador que listra todos os prestadores
router.get('/admin/prestadores', AdminControllers.prestadores)

// Rota de detalhes de prestador
router.get('/admin/detalhes/prestador/:id_prestadores', AdminControllers.detalhesPrestadores)

module.exports = router