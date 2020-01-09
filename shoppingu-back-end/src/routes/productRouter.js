const express = require('express')
const router = express.Router()
const {
  createProduct,
  getProductFromStore,
  modifyProduct,
  getPublishProducts,
  getPublishProduct
} = require('../controllers/productController')
const { verifyToken } = require('../../util/jwt')

router.get('/publish', getPublishProducts)
router.get('/publish/:productId', getPublishProduct)
router.post('/:storeId/:productTypeCode', verifyToken, createProduct)
router.get('/store/:storeId', verifyToken, getProductFromStore)
router.patch('/:productId/store/:storeId', verifyToken, modifyProduct)

module.exports = router
