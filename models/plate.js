const sequelize = require('../db/sequelize.mysql')
const { Model, DataTypes } = require('sequelize')

class Plate extends Model{}

Plate.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    namePlate: {
        type: DataTypes.STRING,
        allowNull: false
    },
    descriptionPlate: {
        type: DataTypes.STRING,
        allowNull: false
    },
    price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    photo: {
        type: DataTypes.STRING,
        allowNull: false
    },
    state: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    sequelize,
    modelName:'Plate',
    tableName: 'tb_plate',
    timestamps: false
})

module.exports = Plate