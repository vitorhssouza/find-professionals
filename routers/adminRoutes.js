const { Router } = require('express');
const express = require('express');
const router = express.Router();
const AdminControllers = require('../controller/AdminControllers')

router.get('/adminhome', AdminControllers.adminHome)


module.exports = router