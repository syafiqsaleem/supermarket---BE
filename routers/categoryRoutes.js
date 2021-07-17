const express = require('express')
const router = express.Router()
const {
  create,
  categoryById,
  read,
} = require('../controllers/categoryController')
const {
  requireSignin,
  isAuth,
  isAdmin,
} = require('../controllers/authController')
const { userById } = require('../controllers/userController')

router.get('/category/:categoryId', read)
router.post('/category/create/:userId', requireSignin, isAuth, isAdmin, create)

router.param('userId', userById)
router.param('categoryId', categoryById)

module.exports = router
