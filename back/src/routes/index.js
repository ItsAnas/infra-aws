const router = require('express').Router()

const passport = require('passport')

const majors = require('./majors')
const tweets = require('./tweets')
const users = require('./users')

router.use('/majors', passport.authenticate('jwt', { session: false }), majors)
router.use('/tweets', passport.authenticate('jwt', { session: false }), tweets)

router.use('/users', users)

module.exports = router
