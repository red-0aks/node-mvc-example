const express = require('express');
const router = express.Router();
const shopController = require('../controllers/shop-controller')

//Get All Products Page
router.get('/', shopController.getProducts)
//Get Product Detail by Id
router.get('/product/:productId', shopController.getProduct)

module.exports = router;
