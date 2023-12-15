const {request, response} = require('express') 
const Order = require('../models/order')
const DetailOrder = require('../models/detailOrder')
const sequelize = require('../db/sequelize.mysql')
const { findAll } = require('../models/order')
const Plate = require('../models/plate')

const registerCtrl =  async (req = request, res = response) => {
    const {order, lstDetailOrder} = req.body

    const t = await sequelize.transaction()

    try {
        const query1 = await Order.create({
            numberBoard: order.numberBoard,
            state: "pendiente",
            idWaiter: order.idWaiter
        }, {transaction: t})

        await Promise.all(lstDetailOrder.map(async (q) => {
            await DetailOrder.create({
                quantity: q.quantity,
                state: "pendiente",
                idPlate: q.idPlate,
                idOrder: query1.id
            }, {transaction: t})
        }))

        console.log('>>>>>COMMIT<<<<<')
        await t.commit()
        res.json({err: false, msg: `The Order was registered with id: ${query1.id}`})
    } catch (err) {
        console.error('>>>>>ROLLBACK<<<<<')
        console.log('---->', err.message)
        await t.rollback()
        res.json({err: true, msg: `${err.message}`})
    }
        
}

const listByStatePending = async (req = request, res = response) => {
    const lstOrders = await DetailOrder.findAll({
        include: [
            {
                model: Order,
                attributes: ["id", "state"]
            },
            {
                model: Plate,
                attributes: ["namePlate"]
            }
        ],
        attributes: ["id", "quantity", "state"],
        where: {
            state: "pendiente"
        }
        
    })

    return res.json(lstOrders)
}

const editStateDelivered = async (req = request, res = response) => {
    const idOrder = req.params.idOrder
    const lstDetailOrder = await DetailOrder.findAll({
        where: {
            idOrder,
            state: "pendiente",
        }
    })

    if(lstDetailOrder.length > 0) return res.json({err: true, msg: `Aun estan pendientes algunos platos por preparar en la orden con id: ${idOrder}`})

    const order = {state: "entregado"}

    await Order.update(order, {
        where: {
            id: idOrder
        }
    })

    return res.json({err: false, msg: `Se actualizo el estado de la orden con id: ${idOrder}`})
}

const editStatePaid = async (req = request, res = response) => {
    const idOrder = req.params.idOrder
    const lstOrder = await Order.findOne({
        where: {
            id: idOrder,
            state: "entregado",
        }
    })

    if(!lstOrder) return res.json({err: true, msg: `El estado de la orden con id: ${idOrder} debe ser 'entregado' para que pueda continuar`})

    const order = {state: "pagado"}

    await Order.update(order, {
        where: {
            id: idOrder
        }
    })

    return res.json({err: false, msg: `Se actualizo el estado de la orden con id: ${idOrder}`})
}

module.exports = {
    registerCtrl,
    listByStatePending,
    editStateDelivered,
    editStatePaid
}