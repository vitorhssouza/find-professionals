const { Router } = require('express');
const express = require('express');
const router = express.Router();
const PrestadorControllers = require('../controller/PrestadorControllers')
const { checarLogadoPrestador } = require('../helper/authLoginPrestador')

// Rota de menu principal prestadores
router.get('/homePrestador', checarLogadoPrestador, PrestadorControllers.home)



module.exports = router;

