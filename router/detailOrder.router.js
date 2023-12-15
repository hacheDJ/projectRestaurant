const { Router } = require('express')
const { edit, remove, editStateDelivered } = require('../controllers/detailOrder.controller')

const router = Router()

router
    .put('/detailOrder/edit', edit)
    .delete('/detailOrder/remove/:id', remove)
    .put('/detailOrder/editStateDelivered/:idDetailOrder/:nameState', editStateDelivered)

module.exports = router