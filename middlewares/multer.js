const multer = require('multer'),
 { join } = require('path')

const CURRENT_PATH = join(__dirname, '../'),
 MINETYPES = ['image/jpeg', 'image/png']
/* console.log('CURRENT PATH ->', CURRENT_PATH); */
const upload = multer({
    storage: multer.diskStorage({
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
    }   
})

module.exports = upload