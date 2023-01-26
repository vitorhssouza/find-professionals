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



module.exports = router;

