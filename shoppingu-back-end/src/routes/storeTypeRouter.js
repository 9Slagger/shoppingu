const express = require('express')
const router = express.Router()
const { getStoreType } = require('../controllers/storeTypeController')
const { verifyToken } = require('../../util/jwt')

router.get('/', verifyToken, getStoreType)

module.exports = router
