const { Router } = require('express')
const { loginCtrl } = require('../controllers/user.controller')

const router = Router()

router
    //.get('/user', userAllCtrl)
    .post('/user/login', loginCtrl)

module.exports = router