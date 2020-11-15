const { response } = require('express')
const BadRequestError = require('../../errors/ApiErrors/BadRequestError')
const Route = require('../Route')
const router = require('express').Router()

router.get('/', () => {
  response.sendStatus(200)
})

router.post('/', () => {
  const { user } = request.body
  if (!user) {
    throw new BadRequestError('No user provided')
  }
  response.status(200).json(`logged in user ${request.body.user}`)
})

module.exports = router
