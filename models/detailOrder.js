const sequelize = require('../db/sequelize.mysql')
const { Model, DataTypes } = require('sequelize')
const Plate = require('../models/plate')
const Order = require('../models/order')

class DetailOrder extends Model{}

DetailOrder.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    state: {
        type: DataTypes.CHAR,
        allowNull: false
    },
    idPlate: {
        type: DataTypes.INTEGER,
        references: {
            model: "Plate",
            key: "id"
        }
    },
    idOrder: {
        type: DataTypes.INTEGER,
        references: {
            model: "Order",
            key: "id"
        }
    }
}, {
    sequelize,
    modelName:'DetailOrder',
    tableName: 'tb_detail_order',
    timestamps: false
})

DetailOrder.belongsTo(Plate, {
    foreignKey: "idPlate"
})

DetailOrder.belongsTo(Order, {
    foreignKey: "idOrder"
})

module.exports = DetailOrder