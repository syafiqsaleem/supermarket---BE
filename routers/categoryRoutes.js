const express = require('express')
const router = express.Router()

router.get('/category/:categoryId', read)
router.post('/category/create/:userId')

module.exports = router
