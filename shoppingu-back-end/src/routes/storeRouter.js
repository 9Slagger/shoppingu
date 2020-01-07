const express = require('express')
const router = express.Router()
const {
  createStore,
  getStoreNotApprove,
  approveStore,
  getMyStore,
  publishStore
} = require('../controllers/storeController')
const { verifyToken } = require('../../util/jwt')

router.post('/', verifyToken, createStore)
router.get('/notapprove', verifyToken, getStoreNotApprove)
router.patch('/approve/:storeId', verifyToken, approveStore)
router.get('/me', verifyToken, getMyStore)
router.patch('/publish/:id', verifyToken, publishStore)

module.exports = router
