const {request, response} = require('express') 
const Order = require('../models/order')
const DetailOrder = require('../models/detailOrder')
const sequelize = require('../db/sequelize.mysql')

const orderRegisterCtrl =  async (req = request, res = response) => {
    const {order, lstDetailOrder} = req.body

    const t = await sequelize.transaction()

    try {
        const query1 = await Order.create({
            numberBoard: order.numberBoard,
            idWaiter: order.idWaiter
        }, {transaction: t})

        await Promise.all(lstDetailOrder.map(async (q) => {
            await DetailOrder.create({
                quantity: q.quantity,
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

module.exports = {
    orderRegisterCtrl
}