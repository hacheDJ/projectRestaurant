const sequelize = require('../db/sequelize.mysql')
const { Model, DataTypes, Sequelize } = require('sequelize')
const User = require('../models/user')

class Order extends Model{}

Order.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    registrationDate: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn("NOW")
    },
    numberBoard: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    state: {
        type: DataTypes.CHAR,
        allowNull: false
    },
    idWaiter: {
        type: DataTypes.INTEGER,
        references: {
            model: "User",
            key: "id"
        }
    }
}, {
    sequelize,
    modelName: "Order",
    tableName: "tb_order",
    timestamps: false
})

Order.belongsTo(User, {
    foreignKey: "idWaiter"
})

module.exports = Order