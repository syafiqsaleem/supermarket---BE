require('dotenv').config()
const mongoose = require('mongoose')
const _ = require('lodash')
const slugify = require('slugify')
const productsData = require('../utils/productsdata')
const Product = require('../models/productModel')

mongoose.set('useNewUrlParser', true)
mongoose.set('useFindAndModify', false)
mongoose.set('useCreateIndex', true)

// productsData = productsData.map((item) => {
//   item.slug = slugify(item.name).toLowerCase()
//   return item
// })
// let connection = null

const slugfiedNames = productsData.map((item) => {
  let slugName = item.name.toLowerCase()
  item.slug = _.kebabCase(slugName)
  return item
})

const mongo_URI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/${process.env.DB_NAME}`

mongoose
  .connect(mongo_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((response) => {
    console.log('MongoDB connection successful')
  })
  .then((response) => {
    Product.insertMany(productsData)
      .then((insertResponse) => {
        console.log('Data seeding successful')
      })
      .catch((insertErr) => {
        console.log(insertErr)
      })
      .finally(() => {
        mongoose.disconnect()
      })
  })
  .catch((err) => {
    console.log(err)
  })
