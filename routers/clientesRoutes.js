const { Router } = require('express');
const express = require('express');
const router = express.Router();
const ClienteControllers = require('../controller/ClienteControllers')

// Rota menu cliente
router.get('/homeCliente', ClienteControllers.clienteHome)

// Rota de perfil cliente
router.get('/homeCliente/perfil', ClienteControllers.perfil)

// Rota de editar perfil
router.get('/homeCliente/perfil/edit', ClienteControllers.edit)

// Rota de salvar edição no perfil
router.post('/homeCliente/perfil/editSave', ClienteControllers.editSave)

module.exports = router
