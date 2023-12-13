const multer = require('multer'),
 bucket = require('firebase-admin')

/*const CURRENT_PATH = join(__dirname, '../'),
 MINETYPES = ['image/jpeg', 'image/png']
 console.log('CURRENT PATH ->', CURRENT_PATH) */



const upload = multer({
    storage: multerS3({
        s3: new S3Client(),
        bucket: "cyclic-unusual-tights-foal-us-east-2",
        metadata: function(req, file, cb){
            cb(null, {fieldName: file.fieldname})
        },
        key: function(req, file, cb){
            const nameModified = file.originalname.split('.')[0]+'_'+Date.now().toString()+'.'+file.originalname.split('.')[1]
            req.imgName = nameModified
            cb(null, nameModified)
        }
    })
})

module.exports = upload