const express = require('express')
const viewsController = require('../controllers/viewsController')
const router = express.Router()

router.route('/products').get(viewsController.index)

module.exports = router
