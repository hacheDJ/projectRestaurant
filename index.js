require('dotenv').config()
const app = require('./app/app')
const sequelize = require('./db/sequelize.mysql')

//console.log('---->', process.env.DB_NAME)
const port = process.env.APP_PORT || 3000





require('dotenv').config()
const aws = require('aws-sdk')

// Configura las credenciales
const credentials = new aws.Credentials({
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    sessionToken: process.env.AWS_SESSION_TOKEN // Opcional, solo si estás utilizando credenciales temporales
  });
  
  // Configura el SDK de AWS con las credenciales
  aws.config.credentials = credentials;
  
  // Crea una instancia de IAM (Identity and Access Management)
  const sts = new aws.STS();

  // Obtiene los detalles de la identidad
  sts.getCallerIdentity({}, (err, data) => {
    if (err) {
      console.error('Error al obtener detalles de la cuenta:', err);
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

