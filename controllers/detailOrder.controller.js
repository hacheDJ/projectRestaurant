const {request, response } = require('express')
const DetailOrder = require('../models/detailOrder')

const edit = async (req = request, res = response) => {
    const {id, quantity, idPlate, idOrder} = req.body
    const detailOrder = {quantity, idPlate}

    const existsDetailOrder = await DetailOrder.findOne({
        where: {
            id
        }
    })

    if(!existsDetailOrder) return res.json({err:true, msg:`No existe el detalle con id ${id} de la orden con id ${idOrder}`})

    await DetailOrder.update(detailOrder, {
        where:{
            id
        }
    })

    return res.json({err:false, msg:`Se actualizo el detalle con id ${id} de la orden con id ${idOrder}`})
}

const remove = async (req = request, res = response) => {
    const id = req.params.id

    const existsDetailOrder = await DetailOrder.findOne({
        where: {
            id
        }
    })

    if(!existsDetailOrder) return res.json({err:true, msg:`No existe el detalle con id ${id}`})

    await DetailOrder.destroy({
        where:{
            id
        }
    })

    return res.json({err:false, msg:`Se elimino el detalle con id ${id}`})
}

const editStateDelivered = async (req = request, res = response) => {
    const idDetailOrder = req.params.idDetailOrder
    const detailOrder = {state: "entregado"}

    const DetailOrderWithStatePending = await DetailOrder.findOne({
        where: {
            id: idDetailOrder,
            state: "pendiente"
        }
    })

    if(!DetailOrderWithStatePending) 
        return res.json({err:true, msg:`No se puede actualizar el estado del detalle de orden con id: ${idDetailOrder} porque su estado es diferente de 'pendiente'`})

    await DetailOrder.update(detailOrder, {
        where: {
            id: idDetailOrder
        }
    })

    return res.json({err:false, msg:`Se actualizo el detalle de orden con id: ${idDetailOrder}`})
}

module.exports = {
    edit,
    remove,
    editStateDelivered
}