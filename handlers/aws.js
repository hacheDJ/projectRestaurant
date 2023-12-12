require('dotenv').config()

const aws = require('aws-sdk')
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