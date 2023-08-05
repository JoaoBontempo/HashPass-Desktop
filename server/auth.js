const RSA = require('crypto')

exports.authDevice = (deviceId) => {

}

exports.decryptDeviceMessage = (message) => {
    return new Promise((resolve, reject) => {
        try {
            const device = global.connectedDevice
    
            const decryptedMessage = RSA.privateDecrypt({
                key: device.privateKey
            }, Buffer.from(message, 'base64'))
        
            resolve(decryptedMessage.toString('utf-8'))
        } catch (error) {
            console.log(error)
            reject(error)
        }
    })
}

exports.newKey = (deviceId, clientPublicKey) => {
    return new Promise(resolve => {
        const keys = RSA.generateKeyPairSync("rsa", {
            modulusLength: 2048,
        });
        
        const _privateKey = keys.privateKey.export({
            type: 'pkcs1',
            format: 'pem'
        })

        const _publicKey = keys.publicKey.export({
            type: 'pkcs1',
            format: 'pem'
        })

        const device = {
            id : deviceId,
            publicKey: clientPublicKey,
            privateKey:  _privateKey
        }
        global.connectedDevice = device
        resolve(_publicKey)  
    })
}