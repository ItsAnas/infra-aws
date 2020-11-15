const passport = require('passport')
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt

const User = require('../models/User')

require('dotenv').config()

const secret = process.env.SECRET || 'secret'

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: secret
}

module.exports = passport => {
  passport.use(new JwtStrategy(opts, (payload, done) => {
    User.findById(payload.id)
      .then(user => {
        if (user) {
          return done(null, {
            id: user.id,
            nickname: user.nickname,
            email: user.email
          })
        }
      })
      .catch(err => console.log(err))
  }))
}

