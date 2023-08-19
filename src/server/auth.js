const RSA = require('crypto')

exports.authDevice = (deviceId) => {

}

exports.decryptDeviceMessage = (message) => {
    return new Promise((resolve, reject) => {
        try {
            const device = global.connectedDevice
            const decryptedBuffer = RSA.privateDecrypt({
                key: device.privateKey,
                padding: RSA.constants.RSA_NO_PADDING,
            }, Buffer.from(message, 'base64'))
            
            let decryptedMessageData = decryptedBuffer.toString('utf-8').replace(/^\uFEFF/, '')
            decryptedMessageData = decryptedMessageData.substring(decryptedMessageData.indexOf('{"message'))
            decryptedMessageData = JSON.parse(decryptedMessageData)
            resolve(decryptedMessageData)
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
            privateKey:  _privateKey,
            ourPublicKey: _publicKey
        }
        global.connectedDevice = device
        resolve(btoa(_publicKey))  
    })
}