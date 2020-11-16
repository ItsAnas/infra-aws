const router = require('express').Router()

router.get('', (request, response) => {
  response.json([
    'MTI',
    'SRS',
    'SCIA',
    'IMAGE',
    'TCOM',
    'GITM',
    'SIGL',
    'GISTRE',
    'ING1',
  ])
})

module.exports = router
