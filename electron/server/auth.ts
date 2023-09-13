import RSA from 'crypto';
import { get, set } from '../session';
import DeviceDTO from '../interface/device/deviceDTO';
import { SessionKeys } from '../interface/session/sessionKeys';
import AuthDTO from '../interface/authDTO';
import DeviceOperationDTO from '../interface/device/deviceOperationDTO';
import { JSEncrypt } from 'jsencrypt';


export function decryptDeviceMessage (message : string) {
    return new Promise<DeviceOperationDTO<any>>((resolve, reject) => {
        try {
            const device = get<DeviceDTO>(SessionKeys.DEVICE);

            const crypt = new JSEncrypt();
            crypt.setPrivateKey(device.privateKey);
            const dechiperedData = crypt.decrypt(message) as string;
            console.log(dechiperedData)
            
            const decryptedMessageData = dechiperedData.replace(/^\uFEFF/, '')
            const clearedMessageData = decryptedMessageData.substring(decryptedMessageData.indexOf('{"message'))
            const deviceData = JSON.parse(clearedMessageData) as DeviceOperationDTO<any>
            resolve(deviceData)
            /*const decryptedBuffer = RSA.privateDecrypt(device.privateKey, Buffer.from(message, 'base64'))
            
            const decryptedMessageData = decryptedBuffer.toString('utf-8').replace(/^\uFEFF/, '')
            const clearedMessageData = decryptedMessageData.substring(decryptedMessageData.indexOf('{"message'))
            const deviceData = JSON.parse(clearedMessageData) as DeviceOperationDTO<any>
            resolve(deviceData)*/
        } catch (error) {
            console.log(error)
            reject(error)
        }
    })
}

export function encryptDeviceMessage(message : DeviceOperationDTO<unknown>) : string {
    /*const device = get<DeviceDTO>(SessionKeys.DEVICE);
    console.log(device.publicKey)
    console.log('\n\n')
    const deviceMessage = RSA.publicEncrypt({
        key: device.publicKey,
        padding: RSA.constants.RSA_PKCS1_PADDING
    }, Buffer.from(JSON.stringify(message)))
    for(let byte of deviceMessage){
        console.log(byte)
    }
    const messageToString = deviceMessage.toString('base64')
    console.log(messageToString)
    console.log('\n\n')
    return messageToString*/

    const device = get<DeviceDTO>(SessionKeys.DEVICE);
    const crypt = new JSEncrypt();
    crypt.setPublicKey(device.publicKey)
    return crypt.encrypt(JSON.stringify(message)) as string;
}

export function newKey (deviceAuth : AuthDTO) {
    return new Promise<string>(resolve => {
        const keys = RSA.generateKeyPairSync('rsa', {
            modulusLength: 4096,    // key size in bits
            publicKeyEncoding: {
                type: 'spki',
                format: 'pem',
            },
            privateKeyEncoding: {   
                type: 'pkcs8',      // !!! pkcs1 doesn't work for me
                format: 'pem',
            },
        });
        
        const _privateKey = keys.privateKey

        const _publicKey = keys.publicKey

        const device = new DeviceDTO(
            deviceAuth.id,
            deviceAuth.publicKey,
            _privateKey,
            _publicKey
        )

        set<DeviceDTO>(SessionKeys.DEVICE, device);

        resolve(btoa(_publicKey.toString()))  
    })
}