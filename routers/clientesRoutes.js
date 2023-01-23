const { Router } = require('express');
const express = require('express');
const router = express.Router();
const ClienteControllers = require('../controller/ClienteControllers')

// Rota menu cliente
router.get('/homeCliente', ClienteControllers.clienteHome)

// Rota de perfil cliente
router.get('/homeCliente/perfil', ClienteControllers.perfil)

module.exports = router
