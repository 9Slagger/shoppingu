const express = require('express')
const router = express.Router()
const {
  createProduct,
  getProductFromStore,
  modifyProduct
} = require('../controllers/productController')
const { verifyToken } = require('../../util/jwt')

router.post('/:storeId/:productTypeCode', verifyToken, createProduct)
router.get('/store/:storeId', verifyToken, getProductFromStore)
router.patch('/:productId/store/:storeId', verifyToken, modifyProduct)

module.exports = router
