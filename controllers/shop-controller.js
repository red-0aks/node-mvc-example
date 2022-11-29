const Product = require('../models/shop-model')

/* Get all products of MongoDB "products" collection
and render the product-list view */
exports.getProducts = (req, res, next) => {
   Product.find()
   .then(result => {
      const productArray = result.map(p => p.toObject())
      
      res.render('shop/product-list', {
         prods: productArray,
         pageTitle: 'Shop',
         hasProducts: productArray.length > 0,
         activeShop: true,
         productCSS: true
      });
   })
}

/* Get a product by _id of MongoDB "products" collection
and load the product-details view */
exports.getProduct = (req, res, next) => {
   const _id = req.params.productId

   Product.findById(_id)
   .then(product => {
      res.render('shop/product-details',{
         product: product.toObject(),
         pageTitle: 'Product Details',
         activeShop: true,
         productCSS: true
      })
   })
}
