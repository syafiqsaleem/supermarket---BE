const express = require('express')
const viewsController = require('../controllers/viewsController')
const router = express.Router()

router.route('/products').get(viewsController.index)
router.route('/products/:slug').get(viewsController.show)

module.exports = router
