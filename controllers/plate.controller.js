const {request, response} = require('express') 
const Plate = require('../models/plate')

const listAllCtrl =  async (req = request, res = response) => {
    const plates = await Plate.findAll()
    res.json(plates)
}

const addCtrl =  async (req = request, res = response) => {
    try {
        const photo = req.imgName
        const {namePlate, descriptionPlate, price} = req.body
        const plate = {namePlate, descriptionPlate, price, photo, state: "disponible"}
        const plateRegister = await Plate.create(plate)

        /* console.log('NEW PLATE', plateRegister) */

        res.json({err: false, msg: `Se agrego el plato con id ${plateRegister.dataValues.id}`})
    } catch (err) {
        res.json({err: true, msg: err.message})
    }
}

const editCtrl =  async (req = request, res = response) => {
    try {
        const {id, namePlate, description, price, photo, state} = req.body
        const findPlate = await Plate.findOne({
            where: {
                id
            }
        })

        if(!findPlate)
            return res.json({err: true, msg: `No existe el plato con id ${id}`})

        const plate = {namePlate, description, price, photo, state}
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

module.exports = {
    listAllCtrl,
    addCtrl,
    editCtrl
}