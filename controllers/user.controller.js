const {request, response} = require('express') 
const User = require('../models/user')

const userLoginCtrl = async (req = request, res = response) => {
    const {usernameLogin, passwordLogin} = req.body
    const data = await User.findAll({
        where: {
            usernameLogin
        }
    })

    if(data.length === 0) 
        return res.json({err: true, mgs: "Incorrect username!", data: null})

    if(data[0].passwordLogin != passwordLogin) 
        return res.json({err: true, msg: "Incorrect password!", data: null})

    res.json({err: false, msg: `Welcome ${data[0].namesUser}`, data})
}

const userAllCtrl =  async (req = request, res = response) => {
    const users = await User.findAll()
    res.json(users)
}

module.exports = {
    userLoginCtrl, 
    userAllCtrl
}