const Product = require('../models/shop-model')

/**
* Get the Admin Add Product Page. Route `/admin/add-product`
* @param {*} req Request
* @param {*} res Response
* @param {*} next Next Callback
*/
exports.getAddProduct = (req, res, next) => {
   res.render('admin/add-product', {
      pageTitle: 'Add Product',
      path: '/admin/add-product',
      formsCSS: true,
      productCSS: true,
      activeAddProduct: true
   });
}

/**
* Post added product data in the form Add Product to MongoDB
* @param {*} req Request
* @param {*} res Response
* @param {*} next Next Callback
*/
exports.postAddProduct = (req, res, next) => {
   const title = req.body.title;
   const imageUrl = req.body.imageUrl;
   const price = req.body.price;
   const description = req.body.description;
   
   const product = new Product({title, imageUrl, price, description})
   
   product.save()
   .then(result =>{
      console.log(result.toObject())
      res.redirect('/admin/products')
   })
   .catch(err =>{
      console.log(err)
   })
}

/**
* Get the Admin Products page. Route `/admin/admin-product-list`
* @param {*} req Request 
* @param {*} res Response
* @param {*} next - Next Callback 
*/
exports.getProducts = (req, res, next)=>{
   Product.find()
   .then(result => {
      const productArray = result.map(p => p.toObject())
      
      res.render('admin/admin-product-list', {
         prods: productArray,
         pageTitle: 'Admin Products',
         hasProducts: productArray.length > 0,
         productCSS: true,
         activeAdminProduct: true,
      });
   })
}

/**
* Get the Admin Edit Form Page. Route `/admin/edit-product`
* @param {*} req Request 
* @param {*} res Response
* @param {*} next - Next Callback 
*/
exports.getEditProduct = (req, res, next) => {
   const _id = req.params.productId
   
   Product.findById(_id)
   .then(product => {
      res.render('admin/edit-product',{
         product: product.toObject(),
         pageTitle: 'Edit Product',
         path: '/admin/edit-product',
         formCss: true,
         productCss: true,
         activeAddProduct: true
      })
   })
   .catch(err =>{
      console.log(err)
   })
}

/**
* Post edited product data in the form Edit Product to MongoDB
* @param {*} req Request
* @param {*} res Response
* @param {*} next Next Callback
*/
exports.editProduct = (req, res, next) => {
   const _id = req.params.productId
   const title = req.body.title
   const imageUrl = req.body.imageUrl
   const price = req.body.price
   const description = req.body.description
   
   Product.findById(_id)
   .then(product => {
      console.log('--(i) El producto es: ')
      console.log(product.toObject())
      
      product.title = title
      product.imageUrl = imageUrl
      product.price = price
      product.description = description
      product.save()
      .then(updated => {
         res.redirect(`/admin/products`)
      })
      .catch(err => {
         console.log('--* Error al guardar los cambios del documento...')
         console.log(err)
      })
   })
   .catch(err => {
      console.log(`--* Error al obtener el documento _id: ${_id}`)
      console.log(err)
   })
}

/**
* Delete the selected product from MongoDB products collection
* @param {*} req Request
* @param {*} res Response
* @param {*} next Next Callback
*/
exports.deleteProduct = (req, res, next) => {
   const _id = req.body.productId

   Product.findByIdAndRemove(_id)
   .then(result => {
      res.redirect('/admin/products')
   })
   .catch(err => {
      console.log(err)
   })
}