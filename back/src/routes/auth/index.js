const router = require('express').Router()
const Login = require('./login')

router.use('/login', Login)

module.exports = router
