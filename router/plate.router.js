const { Router } = require('express')
const { plateAllCtrl } = require('../controllers/plate.controller')

const router = Router()

router
    .get('/plate', plateAllCtrl)

module.exports = router