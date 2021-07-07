const Product = require('../models/productModel')

exports.index = async (req, res, next) => {
  const products = await Product.find()

  res.status(200).render('products/index', {
    title: 'All Products',
    products,
  })
}
