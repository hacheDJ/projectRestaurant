const { Router } = require('express')
const { orderRegisterCtrl } = require('../controllers/order.controller')

const router = Router()

router
    .post('/order', orderRegisterCtrl)

module.exports = router