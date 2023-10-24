const { configDotenv } = require('dotenv')
const mysql = require('mysql2')

const con = mysql.createPool({
    host: "localhost",
    user: "root",
    database: "project_restaurant_db",
    password: ""
})

module.exports = con