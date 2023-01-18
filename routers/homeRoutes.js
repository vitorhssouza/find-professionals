const { Router } = require('express');
const express = require('express');
const HomeController = require('../controller/HomeControlllers')
const router = express.Router();

// Rota principal 
router.get('/', HomeController.home)





module.exports = router