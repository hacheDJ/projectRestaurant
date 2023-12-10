const { Sequelize } = require('sequelize')

const sequelize = new Sequelize(
    process.env.DB_NAME, 
    process.env.DB_USER, 
    process.env.DB_PASS, 
    {
        host: process.env.DB_HOST,
        dialect: process.env.DB_DIALECT,
        port: process.env.DB_PORT,
        dialectOptions: {
            ssl: {
                rejectUnauthorized: false
            }
          } 
    }
)

try {
    (async function(){
        await sequelize.authenticate()
        console.log('>>> Connection DB with Mysql Successfull!!');
    })()
} catch (err) {
    console.error('Error >>>', err);
}

module.exports = sequelize