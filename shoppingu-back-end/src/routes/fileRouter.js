const express = require('express')
const router = express.Router()
const { createFile, uploadFile, reFileName } = require('../controllers/fileController')

router.post('/:productId', uploadFile, createFile, reFileName)

module.exports = router
