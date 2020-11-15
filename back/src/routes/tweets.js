const router = require('express').Router()
const Tweet = require('../models/Tweet')

// const tweets = [
//   {
//     pseudo: 'Mintoo',
//     group: 'MTI',
//     message: 'Bonjour',
//     createdAt: '2020-01-01'
//   },{
//     pseudo: 'Mintoo',
//     group: 'MTI',
//     message: 'Bonjour',
//     createdAt: '2020-01-01'
//   },{
//     pseudo: 'Mintoo',
//     group: 'MTI',
//     message: 'Bonjour',
//     createdAt: '2020-01-01'
//   },{
//     pseudo: 'Mintoo',
//     group: 'MTI',
//     message: 'Bonjour',
//     createdAt: '2020-01-01'
//   },
// ]

router.get('/', (request, response, next) => {
  const tweets = Tweet.find({}, (error, result) => {
    if (error) {
      response.status(400).send(error.message)
    } else {
      response.json(result)
    }
  })
})

router.post('/', (request, response, next) => {
  const { pseudo, group, message } = request.body
  const newTweet = new Tweet({
    pseudo,
    group,
    message,
    createdAt: new Date(Date.now()).toUTCString()
  });
  newTweet.save((error, result) => {
    if (error) {
      response.status(400).send(error.message)
    } else {
      response.status(201).json(result)
    }
  })
})

module.exports = router