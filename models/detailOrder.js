const sequelize = require('../db/sequelize.mysql')
const { Model, DataTypes } = require('sequelize')

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

module.exports = DetailOrder