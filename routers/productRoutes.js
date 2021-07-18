const express = require('express')
const router = express.Router()
const {
  create,
  productById,
  read,
  remove,
  update,
  listCategories,
  list,
  photo,
} = require('../controllers/productController')
const {
  requireSignin,
  isAuth,
  isAdmin,
} = require('../controllers/authController')
const { userById } = require('../controllers/userController')

router.get('/product/:productId', read)
router.post('/product/create/:userId', requireSignin, isAuth, isAdmin, create)
router.delete(
  '/product/:productId/:userId',
  requireSignin,
  isAuth,
  isAdmin,
  remove
)
router.put(
  '/product/:productId/:userId',
  requireSignin,
  isAuth,
  isAdmin,
  update
)
router.get('/products', list)
router.get('/products/categories', listCategories)
router.param('userId', userById)
router.param('productId', productById)

module.exports = router
