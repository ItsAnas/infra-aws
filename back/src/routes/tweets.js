const router = require('express').Router()
const Tweet = require('../models/Tweet')

router.get('/', (request, response) => {
  Tweet.find({}, (error, result) => {
    if (error) {
      response.status(400).send(error.message)
    } else {
      response.json(result)
    }
  }).populate({ path: 'user', select: ['nickname', 'group'] })
})

router.post('/', (request, response) => {
  const { user } = request
  const { message } = request.body
  const newTweet = new Tweet({
    user: user.id,
    message,
  })
  newTweet.save((error, result) => {
    if (error) {
      response.status(400).send(error.message)
    } else {
      response.status(201).json(result)
    }
  })
})

module.exports = router
