const bcrypt = require('bcrypt')

const encryptPass = (txtPlain, saltRounds) => {
    bcrypt.genSalt(saltRounds, function(err, salt){
        if(err) return err.message

        return new Promise(
            (resolve, reject) => {
                bcrypt.hash(txtPlain, salt, function(err, hash){
                    if(err) reject(err.message)
                    else resolve(hash)
                })
            }
        )
    })
}

const comparePass = (passTxtPlain, passEncrypted) => {
    return new Promise(
        (resolve, reject) => {
            bcrypt.compare(passTxtPlain, passEncrypted, function(err, result){
                if(err) reject(err.message)
                else resolve(result)
            })
        }
    )
}

module.exports = {
    encryptPass,
    comparePass
}