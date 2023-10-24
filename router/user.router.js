const { Router } = require('express')
const { userLoginCtrl, userAllCtrl } = require('../controllers/user.controller')

const router = Router()

router
    //.get('/user', userAllCtrl)
    .post('/user/login', userLoginCtrl)

module.exports = router