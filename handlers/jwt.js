require('dotenv').config()

const jwt = require('jsonwebtoken')

const signToken = (user) => {
    return jwt.sign(
        {
            id: user.id,
            state: user.state
        },
        process.env.SECRET_KEY,
        {
            expiresIn: "24h"
        })
}

const verifyToken = (token) => {
    try {
        return jwt.verify(token, process.env.SECRET_KEY)
    } catch (error) {
        return null;
    }
}

module.exports = { signToken, verifyToken }