import RSA from 'crypto';
import { get, set } from '../session';
import DeviceDTO from '../interface/device/deviceDTO';
import { SessionKeys } from '../interface/session/sessionKeys';
import AuthDTO from '../interface/authDTO';
import DeviceOperationDTO from '../interface/device/deviceOperationDTO';

export function decryptDeviceMessage (message : string) {
    return new Promise<DeviceOperationDTO<any>>((resolve, reject) => {
        try {
            const device = get<DeviceDTO>(SessionKeys.DEVICE);
            const decryptedBuffer = RSA.privateDecrypt({
                key: device.privateKey,
                padding: RSA.constants.RSA_NO_PADDING,
            }, Buffer.from(message, 'base64'))
            
            const decryptedMessageData = decryptedBuffer.toString('utf-8').replace(/^\uFEFF/, '')
            const clearedMessageData = decryptedMessageData.substring(decryptedMessageData.indexOf('{"message'))
            const deviceData = JSON.parse(clearedMessageData) as DeviceOperationDTO<any>
            resolve(deviceData)
        } catch (error) {
            console.log(error)
            reject(error)
        }
    })
}

export function newKey (deviceAuth : AuthDTO) {
    return new Promise<string>(resolve => {
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