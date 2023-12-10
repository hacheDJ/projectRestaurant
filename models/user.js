const sequelize = require('../db/sequelize.mysql')
const { Model, DataTypes } = require('sequelize')

class User extends Model{}

User.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    namesUser: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastnameP: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastnameM: {
        type: DataTypes.STRING,
        allowNull: false
    },
    usernameLogin: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    passwordLogin: {
        type: DataTypes.STRING,
        allowNull: false
    },
    role: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    sequelize,
    modelName:'User',
    tableName: 'tb_user',
    timestamps: false
})

module.exports = User