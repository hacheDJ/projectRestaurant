require('dotenv').config()
const app = require('./app/app')
const sequelize = require('./db/sequelize.mysql')

//console.log('---->', process.env.DB_NAME)
const port = process.env.APP_PORT || 3000

sequelize.sync().then(
    () => {
        console.log('Models syncronized success')

        app.listen(port, () => {
            console.log(`>>> Server runnign on port ${port} <<<`)
        })
    }
).catch(
    (err) => {
        console.error('Not syncronized: ', err)
    }
)

