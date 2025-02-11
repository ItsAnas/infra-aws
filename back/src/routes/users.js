const router = require('express').Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/User')

require('dotenv').config()

const secret = process.env.SECRET || 'secret'


router.post('/login', (request, response) => {
  const { email, password } = request.body
  // Find user
  User.findOne({ email })
    .then((user) => {
      if (!user) {
        response.status(404).json({ error: 'No account found' })
      }

      // Compare passwords
      bcrypt.compare(password, user.password)
        .then((isMatch) => {
          if (isMatch) {
            const payload = {
              id: user._id,
              nickname: user.nickname
            }

            // Generate JWT, send it back to user
            jwt.sign(payload, secret, { expiresIn: 36000 },
              (err, token) => {
                if (err) response.status(500).json({ error: 'Error signing token' })
                response.json({
                  success: true,
                  token: `Bearer ${token}`,
                })
              })
          } else {
            response.status(400).json({ error: 'Password is incorrect' })
          }
        })
    })
})

router.post('/register', (request, response) => {
  const {
    email, password, nickname, group,
  } = request.body
  // Find user
  User.findOne({ email })
    .then((user) => {
      if (user) {
        response.status(400).json({ error: 'User already exists' })
      }

      const newUser = new User({
        nickname,
        email,
        password,
        group,
      })

      // Generate hash and save user
      bcrypt.genSalt(10, (err, salt) => {
        if (err) throw err
        bcrypt.hash(newUser.password, salt,
          (hashErr, hash) => {
            if (hashErr) throw hashErr
            newUser.password = hash
            newUser.save().then((res) => response.json(res))
              .catch(() => response.status(400).json({ error: 'Error while register' }))
          })
      })
    })
})

module.exports = router
