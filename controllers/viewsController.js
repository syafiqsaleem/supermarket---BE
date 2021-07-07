const _ = require('lodash')
const Product = require('../models/productModel')

exports.index = async (req, res, next) => {
  const products = await Product.find()

  res.status(200).render('products/index', {
    title: 'All Products',
    products,
  })
}

// exports.newForm = async (req, res, next) => {
//   res.status(200).render('products/new', {
//     title: 'Add New Product',
//   })
// }

exports.show = (req, res) => {
  let product = {}

  Product.findOne({ slug: req.params.slug })
    .then((item) => {
      // if item is not found, redirect to homepage
      if (!item) {
        res.redirect('/products')
        return
      }
      product = item
    })
    .then((ratings) => {
      res.render('products/show', {
        title: 'View Product',
        product: product,
      })
    })
    .catch((err) => {
      console.log(err)
      res.redirect('/products')
    })
}
