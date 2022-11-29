const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin-controller')

//Get Add product Page
router.get('/add-product', adminController.getAddProduct);
//Post added product data in the form Add Product
router.post('/add-product', adminController.postAddProduct)
//Get Admin Products Page
router.get('/products', adminController.getProducts)
//Get Admin Edit Product Page
router.get('/edit-product/:productId', adminController.getEditProduct)
//Post edited product data in the form Edit Product
router.post('/edit-product/:productId', adminController.editProduct)
//Post deleted product in the Admin Product List Page
router.post('/delete-product', adminController.deleteProduct)

exports.router = router;