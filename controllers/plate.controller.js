const {request, response} = require('express') 
const Plate = require('../models/plate')

const plateAllCtrl =  async (req = request, res = response) => {
    const plates = await Plate.findAll()
    res.json(plates)
}

module.exports = {
    plateAllCtrl
}