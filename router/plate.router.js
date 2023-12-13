const { Router } = require('express')
const { listAllCtrl, addCtrl, editCtrl, getPhotoCtrl } = require('../controllers/plate.controller')
const upload = require('../middlewares/multer.firebase')

//upload.fields([{name:"namePlate", maxCount:1}, {name:"descriptionPlate", maxCount:1}, {name:"price", maxCount:1}, {name:"photo", maxCount:1}, {name:"state", maxCount:1},] )
const router = Router()

router
    .get('/plate/listAll', listAllCtrl)
    .post('/plate/register', upload.fields([{name:"namePlate", maxCount:1}, {name:"descriptionPlate", maxCount:1}, {name:"price", maxCount:1}, {name:"photo", maxCount:1}, {name:"state", maxCount:1},] ), addCtrl)
    .put('/plate/edit', editCtrl)
    .get('/plate/showPhoto/:nameFile', getPhotoCtrl)

module.exports = router