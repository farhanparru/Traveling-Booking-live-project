const express = require('express')
const router = express.Router()
const userController = require('../controller/userController')
const verifyiToken = require('../middlewarse/userAuth')

router
.post('/signup', userController.userSignup)
.post('/login',  userController.userLogin)




module.exports = router               