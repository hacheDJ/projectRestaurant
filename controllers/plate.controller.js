const {request, response} = require('express') 
const Plate = require('../models/plate')
const {get} = require('../handlers/aws')
const bucket = require('../handlers/firebase.admin')

const listAllCtrl =  async (req = request, res = response) => {
    const plates = await Plate.findAll()
    res.json(plates)
}

const addCtrl =  async (req = request, res = response) => {
    
    try {
        
        const {namePlate, descriptionPlate, price} = req.body
        const photoFile = req.file

        console.log('REQBODY-----> ', req.body)
        console.log('REQ-FILE-----> ', req.file)
        //console.log('REQ-PHOTO-----> ', req.photo)
        console.log('PHOTO-----> ', namePlate)
        console.log('PHOTO-----> ', descriptionPlate)
        //console.log('PHOTO-----> ', photo)
        console.log('PHOTO-----> ', price)
        
        if(!photoFile) return res.json({err: true, msg: `No añadio ninguna foto`})
        const originalName = photoFile.originalname
        const extension = originalName.split('.').pop()
        const nameWithoutExtension = originalName.split('.')[0]
        const modifiedName = `${nameWithoutExtension}_${new Date().toDateString()}_${extension}`
        console.log('MODIFIED_NAME-----> ', modifiedName)
        bucket.upload(photoFile.buffer, {
            destination: modifiedName,
            metadata: {
                contentType: photoFile.mimetype
              }
        }, (err, uploadedFile) => {
            if(err) return res.json({err: true, msg: err})

            /* const downloadUrl = uploadedFile.metadata.mediaLink
            return res.json({err: false, msg: `Subido al url: ${downloadUrl}`}) */
           }   
        )

        const plate = {namePlate, descriptionPlate, price, photo: modifiedName, state: "disponible"}
        const plateRegister = await Plate.create(plate)

        /* console.log('NEW PLATE', plateRegister) */

        res.json({err: false, msg: `Se agrego el plato con id ${plateRegister.dataValues.id}`})
    } catch (err) {
        res.json({err: true, msg: err.message})
    }
    
    
    /* try {
        const photo = req.imgName
        const {namePlate, descriptionPlate, price} = req.body
        const plate = {namePlate, descriptionPlate, price, photo, state: "disponible"}
        const plateRegister = await Plate.create(plate)

        console.log('NEW PLATE', plateRegister)

        res.json({err: false, msg: `Se agrego el plato con id ${plateRegister.dataValues.id}`})
    } catch (err) {
        res.json({err: true, msg: err.message})
    } */
}

const editCtrl =  async (req = request, res = response) => {
    try {
        const {id, namePlate, descriptionPlate, price, photo, state} = req.body
        const findPlate = await Plate.findOne({
            where: {
                id
            }
        })

        if(!findPlate)
            return res.json({err: true, msg: `No existe el plato con id ${id}`})

        const plate = {namePlate, descriptionPlate, price, photo, state}
        await Plate.update(plate, {
            where: {
                id
            }
        })

        return res.json({err: false, msg: `Se actualizo el plato con id ${id}`})
     } catch (err) {
        res.json({err: true, msg: err.message})
    } 
}

const getPhotoCtrl = (req = request, res = response) => {
    const nameFile = req.params.nameFile

   /*  res.setHeader('Content-Type', 'image/jpeg') */
   //res.setHeader('Content-Type', 'image/*')

    get(nameFile).then(x => {
        console.log('promise-------> ', x)
        res.send(x.Body)
    })
}

module.exports = {
    listAllCtrl,
    addCtrl,
    editCtrl,
    getPhotoCtrl
}