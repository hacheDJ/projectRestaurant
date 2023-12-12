const multer = require('multer'),
 multerS3 = require('multer-s3'),
 { S3Client } = require('@aws-sdk/client-s3'),
 { join } = require('path')

const CURRENT_PATH = join(__dirname, '../'),
 MINETYPES = ['image/jpeg', 'image/png']
/* console.log('CURRENT PATH ->', CURRENT_PATH) */
const upload = multer({
    storage: multerS3({
        s3: new S3Client(),
        bucket: "cyclic-unusual-tights-foal-us-east-2",
        metadata: function(req, file, cb){
            cb(null, {fieldName: file.fieldname})
        },
        key: function(req, file, cb){
            const nameModified = file.originalname.split('.')[0]+Date.now().toString()+file.originalname.split('.')[1]
            req.imgName = nameModified
            cb(null, nameModified)
        }
    })

    /* storage: multer.diskStorage({
        destination: join(CURRENT_PATH, 'upload'),
        filename: (req, urlImg, cb) => {
            const extentionImg = urlImg.originalname.split('.').pop(),
             nameImg = urlImg.originalname.split('.')[0],
             fullname = `${nameImg}_${Date.now()}.${extentionImg}`

            req.imgName = fullname

            cb(null, fullname)
        }
    }),
    fileFilter: (req, urlImg, cb) =>{
        if(MINETYPES.includes(urlImg.mimetype))
            cb(null, true)
        else
            cb(new Error(`${urlImg.originalname.split('.').pop()} is an invalid format`))
    },
    limits: {
        fieldSize: 1000000
    }  */  
})

module.exports = upload