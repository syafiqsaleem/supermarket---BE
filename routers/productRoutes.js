const express = require('express')
const viewsController = require('../controllers/viewsController')
const { read, create } = require('../controllers/productController')
const router = express.Router()

// router
//   .route('/')
//   .get(productController.getAllProducts)
//   .post(productController.createProduct)

// router
//   .route('/:id')
//   .get(productController.getProduct)
//   .patch(productController.updateProduct)
//   .delete(productController.deleteProduct)

router.get('/', read)
router.post('/', create)
module.exports = router
