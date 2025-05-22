const express = require('express');

const CategoryService = require('../services/category.service');
const validatorLogin = require('../middlewares/validator.login');

const router = express.Router();
// middleware integrado en el endpoint
router.post('/', validatorLogin, function(req, res) { CategoryService.create(req, res) })
// endpoint para obtener todos o solo uno en caso de enviar un id
router.get('/all/:id', function(req, res) { CategoryService.getByOption(req, res) })
router.get('/all', function(req, res) { CategoryService.getByOption(req, res) })
module.exports = router;