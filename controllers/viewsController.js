const _ = require('lodash')
const slugify = require('slugify')
const Product = require('../models/productModel')

exports.index = async (req, res, next) => {
  const products = await Product.find()

  res.status(200).render('products/index', {
    title: 'All Products',
    products,
  })
}

exports.newForm = async (req, res, next) => {
  res.status(200).render('products/new', {
    title: 'Add New Product',
  })
}

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

exports.create = async (req, res) => {
  Product.create({
    name: req.body.name,
    brand: req.body.brand,
    image: req.body.image,
    origin: req.body.origin,
    weight: req.body.weight,
    unit: req.body.unit,
    description: req.body.description,
    category: req.body.category,
    stocks: req.body.stocks,
    price: req.body.price,
    status: req.body.status,
  })
    .then((createResp) => {
      res.redirect('/products')
    })
    .catch((err) => {
      console.log(err)
      res.redirect('/products/new')
    })
}

exports.editForm = (req, res) => {
  Product.findOne({ slug: req.params.slug })
    .then((item) => {
      res.render('products/edit', {
        title: 'Edit Product',
        product: item,
      })
    })
    .catch((err) => {
      res.redirect('/products')
    })
}
exports.update = (req, res) => {
  let newSlug = slugify(req.body.name).toLowerCase()

  Product.updateOne({
    $set: {
      name: req.body.name,
      brand: req.body.brand,
      image: req.body.image,
      origin: req.body.origin,
      weight: req.body.weight,
      unit: req.body.unit,
      description: req.body.description,
      category: req.body.category,
      stocks: req.body.stocks,
      price: req.body.price,
      status: req.body.status,
      slug: newSlug,
    },
  })
    .then((updateResp) => {
      res.redirect('/products/')
    })
    .catch((err) => {
      res.redirect('/products/' + req.params.slug + '/show')
    })
}
