const router = require('express').Router()

const tweets = [
  {
    pseudo: 'Mintoo',
    group: 'MTI',
    message: 'Bonjour',
    createdAt: '2020-01-01'
  },{
    pseudo: 'Mintoo',
    group: 'MTI',
    message: 'Bonjour',
    createdAt: '2020-01-01'
  },{
    pseudo: 'Mintoo',
    group: 'MTI',
    message: 'Bonjour',
    createdAt: '2020-01-01'
  },{
    pseudo: 'Mintoo',
    group: 'MTI',
    message: 'Bonjour',
    createdAt: '2020-01-01'
  },
]

router.get('/', (request, response, next) => {
  response.json(tweets)
})

router.post('/', (request, response, next) => {
  console.log(request.body)
  response.status(201).send(request.body)
})

module.exports = router