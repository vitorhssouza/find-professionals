const { Router } = require('express');
const express = require('express');
const HomeController = require('../controller/HomeControlllers')
const router = express.Router();

// Rota principal 
router.get('/', HomeController.home);

// Rota de login
router.get('/login', HomeController.login);

// Rota de Cadastro
router.get('/cadastro', HomeController.cadastro);

// rota de salvar cadastro
router.post('/cadastro/save', HomeController.cadastroSave);

// rota de verificar login
router.post('/login/verificar', HomeController.loginVerificar)

// Rota para deslogar
router.get('/logout', HomeController.logout);




module.exports = router