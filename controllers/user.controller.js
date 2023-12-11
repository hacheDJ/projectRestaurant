const {request, response} = require('express') 
const User = require('../models/user')
const {comparePass} = require('../handlers/bcrypt')
const {signToken} = require('../handlers/jwt')

const loginCtrl = async (req = request, res = response) => {
    const {usernameLogin, passwordLogin} = req.body
    const data = await User.findOne({
        where: {
            usernameLogin
        }
    })

    console.log('USER -> ', data)

    if(!data) 
        return res.json({err: true, msg: "Incorrect username!", data: null, token: null})

    passOk = await comparePass(passwordLogin, data.dataValues.passwordLogin)

    console.log('PASSOK -> ', passOk)

    if(!passOk) 
        return res.json({err: true, msg: "Incorrect password!", data: null, token: null})

    const token = signToken(data.dataValues)

    return res.json({err: false, msg: `Welcome ${data.dataValues.namesUser}`, data, token})
}

const listAllCtrl =  async (req = request, res = response) => {
    const users = await User.findAll()
    return res.json(users)
}

module.exports = {
    loginCtrl, 
    listAllCtrl
}