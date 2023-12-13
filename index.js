require('dotenv').config()
const app = require('./app/app')
const sequelize = require('./db/sequelize.mysql')

//console.log('---->', process.env.DB_NAME)
const port = process.env.APP_PORT || 3000





require('dotenv').config()
const aws = require('aws-sdk')

// Configura las credenciales
const credentials = new aws.Credentials({
    accessKeyId: 'ASIAY3DGHTVYAKOJZCEI',
    secretAccessKey: 'yrAbuHie05yUkP63E2JKOzoK20PWlzxzVXhYKbfj',
    sessionToken: 'IQoJb3JpZ2luX2VjEKv//////////wEaCXNhLWVhc3QtMSJHMEUCIQClhAPMi+4h0sIVa+2ClghHsNLMmFHtrZdT8Ioje74YKAIgPIQU27RMOX0SenJbdWiCchrkhTkbVYZ7sZCSC93yEpkqrQIIJBAAGgw2MDc5NTIyODA5NDQiDCkX3n/b/F1x3JQCWSqKAkH7iBj5s2Bqhz59siMakzedTi4ykYZC3xJNgq4q1YVR68nGVvPEE4bWAGjngmZYh0c7KTiRWX9oula2/OLRUS2f8esVErcAfWGq5XBm0zTCm+B+bUi2BEzU6wG6femJV4JQtt3gjanZio2jDDleOLh1e3tpcUOb4Ggb8uKVDvyvrGqcVtx6K36vIZ8DK2Usz13CIDVg5K391SBnsJRzmJishxwWv0y7UKKoCN74EcEy2GcNZZg722Q8rsKkI4iptgGKpo7C3H7T6ub8UKAqlegfv2XgXKc78P2+RYcs+dJwy1JTXhttaH/CoDEHgMhVYz9JSNvHbf3z5+ZfekCJev1oVBDZgCl5+yLcMMab36sGOp0Bkd8lWwOg5oExZzDTSdL+FyzSTHeCrR4DITf/DoISjpM0QqfDqDdT7EsbWm7ApsNhf49HwYY/oK9Eb62HbL9o7zpayXE1lWiafAdBheR2FHSXFrgyRb13E5OTRJkHJ/7IXtEZXPBvUCaybRBXh9BWL8gInWH18NWtLsJ3PsZaOZB1UVkiwE4UM1jnrOoGCXKwmIlESoeY1ReMpduXmg==' // Opcional, solo si estás utilizando credenciales temporales
  });
  
  // Configura el SDK de AWS con las credenciales
  aws.config.credentials = credentials;
  
  // Crea una instancia de IAM (Identity and Access Management)
  const sts = new aws.STS();

  // Obtiene los detalles de la identidad
  sts.getCallerIdentity({}, (err, data) => {
    if (err) {
      console.error('XXEEEError al obtener detalles de la cuenta:', err);
    } else {
      console.log('ID de cuenta:', data.Account);
      console.log('Arn de cuenta:', data.Arn);
    }
  })






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

