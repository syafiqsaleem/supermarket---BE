const express = require('express')
const viewsController = require('../controllers/viewsController')
const router = express.Router()

router.route('/products').get(viewsController.index)
router.get('/products/new', viewsController.newForm)
router.route('/products/:slug').get(viewsController.show)
router.post('/products', viewsController.create)
router.get('/products/:slug/edit', viewsController.editForm)
router.patch('/products/:slug', viewsController.update)

module.exports = router
