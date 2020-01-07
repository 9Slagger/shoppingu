const express = require('express')
const router = express.Router()
const { getProductType } = require('../controllers/productTypeController')

router.get('/', getProductType)

module.exports = router
