const mongoose = require('mongoose')
const slugify = require('slugify')
const { ObjectId } = mongoose.Schema

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: 'Name is required',
  },
  photo: {
    data: Buffer,
    contentType: String,
  },
  brand: {
    type: String,
    trim: true,
  },
  origin: {
    type: String,
    trim: true,
  },
  weight: {
    type: String,
    trim: true,
  },
  unit: {
    type: String,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  // Set to ObjectId in order to use populate
  category: {
    type: ObjectId,
    ref: 'Category',
    required: true,
  },
  stocks: {
    type: Number,
    required: 'Stocks is required',
  },
  price: {
    type: Number,
    required: 'Price is required',
  },
  status: {
    type: String,
    enum: ['In stocks', 'Out of Stock'],
  },
  updated: Date,
  created: {
    type: Date,
    default: Date.now,
  },
  shipping: {
    type: Boolean,
    required: false,
  },

  slug: { type: String, unique: true },
})

productSchema.pre('save', function (next) {
  this.slug = slugify(this.name, { lower: true })
  next()
})

const Product = mongoose.model('Product', productSchema)

module.exports = Product
