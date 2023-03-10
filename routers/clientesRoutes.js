const { Router } = require('express');
const express = require('express');
const router = express.Router();
const ClienteControllers = require('../controller/ClienteControllers')
const { checarLogadoCliente } = require('../helper/authLoginCliente')

// Rota menu cliente
router.get('/homeCliente', checarLogadoCliente, ClienteControllers.clienteHome)

// Rota de perfil cliente
router.get('/homeCliente/perfil', checarLogadoCliente, ClienteControllers.perfil)

// Rota de editar perfil
router.get('/homeCliente/perfil/edit', checarLogadoCliente, ClienteControllers.edit)

// Rota de salvar edição no perfil
router.post('/homeCliente/perfil/editSave', checarLogadoCliente, ClienteControllers.editSave)

// Rota de detalhes de prestadores
router.get('/cliente/detalhes/prestador/:id_prestadores', checarLogadoCliente, ClienteControllers.detahes)

// Rota de contratar serviço
router.get('/cliente/contratar/prestador/:id_prestador', checarLogadoCliente, ClienteControllers.contratar)

// Rota para salvar contratação de serviço
router.post('/cliente/contratar/prestador/save/:id_prestador', checarLogadoCliente, ClienteControllers.contratarSave)

// Rota de historico de contratação
router.get('/cliente/historico', checarLogadoCliente, ClienteControllers.historico)



module.exports = router
