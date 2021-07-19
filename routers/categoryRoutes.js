const express = require('express')
const router = express.Router()
const {
  create,
  categoryById,
  read,
  list,
} = require('../controllers/categoryController')
const {
  requireSignin,
  isAuth,
  isAdmin,
} = require('../controllers/authController')
const { userById } = require('../controllers/userController')

router.get('/category/:categoryId', read)
router.post('/category/create/:userId', requireSignin, isAuth, isAdmin, create)
router.put('/category/:categoryId/:userId', requireSignin, isAuth, isAdmin)

router.get('/categories', list)

router.param('categoryId', categoryById)
router.param('userId', userById)
module.exports = router
