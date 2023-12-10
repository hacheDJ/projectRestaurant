const { Router } = require('express')
const { listAllCtrl, addCtrl, editCtrl } = require('../controllers/plate.controller')
const upload = require('../middlewares/multer')


const router = Router()

router
    .get('/plate', listAllCtrl)
    .post('/plate/register', upload.fields([{name:"namePlate", maxCount:1}, {name:"description", maxCount:1}, {name:"price", maxCount:1}, {name:"photo", maxCount:1}, {name:"state", maxCount:1},] ), addCtrl)
    .put('/plate/edit', editCtrl)

module.exports = router