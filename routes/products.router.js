const express = require('express');
const ProductService = require('../services/product.service');
const validatorLogin = require('../middlewares/validator.login');

const router = express.Router();
const service = new ProductService();
router.get('/', function(req, res) { service.get(req, res) })
router.post('/', validatorLogin,function(req, res) { service.create(req, res) })
router.put('/', validatorLogin,function(req, res) { service.update(req, res) })
router.patch('/:id',validatorLogin, function(req, res) { service.state(req.params.id, res) })
router.delete('/:id',validatorLogin ,function(req, res) { service.delete(req.params.id, res) })
//endpoint de productos por dirección agregado
router.get("/:id/:direction ", function(req, res) { service.getByMovementType(req.params.id, req.params.direction, res) })
module.exports = router;