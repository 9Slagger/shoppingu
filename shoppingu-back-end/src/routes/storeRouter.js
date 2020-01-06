const express = require('express')
const router = express.Router()
const { createStore, getStoreNotApprove, approveStore } = require('../controllers/storeController')
const { verifyToken } = require('../../util/jwt')

router.post('/', verifyToken, createStore)
router.get('/notapprove', verifyToken, getStoreNotApprove)
router.patch('/approve/:storeId', verifyToken, approveStore)

module.exports = router
