const router = require('express').Router()

const majors = require('./majors')
const tweets = require('./tweets')

router.use('/majors', majors)
router.use('/tweets', tweets)

module.exports = router
