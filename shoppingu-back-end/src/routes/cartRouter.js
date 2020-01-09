const express = require('express')
const router = express.Router()
const { updateMyCart, getProductInMyCart } = require('../controllers/cartController')
const { verifyToken } = require('../../util/jwt')

router.put('/', verifyToken, updateMyCart)
router.get('/', verifyToken, getProductInMyCart)

module.exports = router
