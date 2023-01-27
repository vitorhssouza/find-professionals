const { Router } = require('express');
const express = require('express');
const router = express.Router();
const PrestadorControllers = require('../controller/PrestadorControllers')
const { checarLogadoPrestador } = require('../helper/authLoginPrestador')

// Rota de menu principal prestadores
router.get('/homePrestador', checarLogadoPrestador, PrestadorControllers.home)

// Rota de detalhes de clientes
router.get('/prestador/detalhes/cliente/:id_clientes/:id_servico', checarLogadoPrestador, PrestadorControllers.detalhes);

// Rota de aceitar servico
router.get('/prestador/aceitar/cliente/:id_servico', checarLogadoPrestador, PrestadorControllers.aceitar);

// Rota que recusar o serviço
router.get('/prestador/recursar/cliente/:id_servico', checarLogadoPrestador, PrestadorControllers.recusar)

// Rota que lista o historico de serviço
router.get('/prestador/historico', checarLogadoPrestador, PrestadorControllers.historico)



module.exports = router;

