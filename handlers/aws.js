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
  const iam = new aws.IAM();
  
  // Obtiene los detalles de la cuenta
  iam.getAccountSummary({}, (err, data) => {
    if (err) {
      console.error('Error al obtener detalles de la cuenta:', err);
    } else {
      console.log('ID de cuenta:', data.SummaryMap.AccountId);
      console.log('Alias de cuenta:', data.SummaryMap.AccountAlias);
    }
  })

const s3 = new aws.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION
})

const save = async (file, nameFile) => {
    return await s3.upload({
        Body: file.buffer,
        Bucket: process.env.CYCLIC_BUCKET_NAME,
        Key: nameFile
    }).promise()
}

const getAll = () => {

} 

const get = async (file) => {
    return await s3.getObject({
        Bucket: process.env.CYCLIC_BUCKET_NAME,
        Key: file
    }).promise()
}

module.exports = {
    save, get, getAll
}