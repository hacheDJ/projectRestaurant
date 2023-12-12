require('dotenv').config()

const aws = require('aws-sdk')
const s3 = new aws.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION
})

const save = (file, nameFile) => {
    return await s3.upload({
        Body: file.buffer,
        Bucket: "cyclic-unusual-tights-foal-us-east-2",
        Key: `uploads/${nameFile}`,
    }).promise()
}

const getAll = () => {

} 

const get = (file) => {
    let my_file = await s3.getObject({
        Bucket: "cyclic-unusual-tights-foal-us-east-2",
        Key: `uploads/${file}`,
    }).promise()

    return my_file
}

module.export = {
    save, get, getAll
}