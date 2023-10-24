require('dotenv').config()

const express = require('express')
const app = express()
const { join } = require('path')
const { routerUser, routerPlate, routerOrder } = require('../router/index') 

const baseUrl = '/api/v0.1'

app
    .use(express.json())
    .use(express.urlencoded({ extended: true }))
    .use(`${baseUrl}/public`, express.static(join(__dirname, '../upload')))
    .use(baseUrl, routerUser)
    .use(baseUrl, routerPlate)
    .use(baseUrl, routerOrder)

module.exports = app