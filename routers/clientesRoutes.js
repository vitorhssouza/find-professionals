const { Router } = require('express');
const express = require('express');
const router = express.Router();
const ClienteControllers = require('../controller/ClienteControllers')

// Rota menu cliente
router.get('/homeCliente', ClienteControllers.clienteHome)

module.exports = router
