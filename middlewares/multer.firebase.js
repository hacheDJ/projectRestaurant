const multer = require('multer'),
 bucket = require('../handlers/firebase.admin')

/*const CURRENT_PATH = join(__dirname, '../'),
 MINETYPES = ['image/jpeg', 'image/png']
 console.log('CURRENT PATH ->', CURRENT_PATH) */



const upload = multer({
    storage: multer.memoryStorage()
    

    /* storage: multerS3({
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
    }) */

    /* const upload = multer({
        storage: multer.diskStorage({
            destination: join(CURRENT_PATH, '/uploads'),
            filename: (req, urlImg, cb) => {
                const extImg = urlImg.originalname.split('.').pop(),
                 nameImg = urlImg.originalname.split('.')[0],
                 fullname = `${nameImg}_${Date.now()}.${extImg}`
    
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
        }   
    }) */
})

module.exports = upload