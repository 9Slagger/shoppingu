const express = require('express')
const router = express.Router()
const { createStore } = require('../controllers/storeController')
const { verifyToken } = require('../../util/jwt')

router.post('/', verifyToken, createStore)

module.exports = router
