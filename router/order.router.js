const { Router } = require('express')
const { registerCtrl, listByStatePending, editStateDelivered, editStatePaid } = require('../controllers/order.controller')

const router = Router()

router
    .post('/order', registerCtrl)
    .get('/order/listByStatePending', listByStatePending)
    .put('/order/editStateDelivered/:idOrder', editStateDelivered)
    .put('/order/editStatePaid/:idOrder', editStatePaid)

module.exports = router