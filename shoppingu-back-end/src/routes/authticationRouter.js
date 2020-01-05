const express = require('express')
const router = express.Router()
const { signup } = require('../controllers/authticatinControler')
// const { verifyToken } = require('../../util/jwt')

router.post('/', signup)

module.exports = router
