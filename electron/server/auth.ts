import chyper from 'crypto';
import { get, set } from '../session';
import DeviceDTO from '../interface/device/deviceDTO';
import { SessionKeys } from '../interface/session/sessionKeys';
import AuthDTO from '../interface/authDTO';
import DeviceOperationDTO from '../interface/device/deviceOperationDTO';
import { JSEncrypt } from 'jsencrypt';
import CryptoJS from 'crypto-js';


export function decryptAssymetricDeviceMessage (message : string) {
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
        } catch (error) {
            console.log(error)
            reject(error)
        }
    })
}

export function decryptSymetricDeviceMessage (message : string) : DeviceOperationDTO<any> {
    const device = get<DeviceDTO>(SessionKeys.DEVICE);
    const bytes  = CryptoJS.AES.decrypt(message, getDeviceSymmetricKey(device));
    const jsonData = bytes.toString(CryptoJS.enc.Utf8)
    return  JSON.parse(jsonData) as DeviceOperationDTO<any>
}

export function encryptAssymetricDeviceMessage(message : DeviceOperationDTO<unknown>) : string {
    const device = get<DeviceDTO>(SessionKeys.DEVICE);
    const crypt = new JSEncrypt();
    crypt.setPublicKey(device.publicKey)
    return crypt.encrypt(JSON.stringify(message)) as string;
}

function toSha256(input: string): string {
    const hash = chyper.createHash('sha256');
    hash.update(input);
    return hash.digest('hex');
}

function getDeviceSymmetricKey(device : DeviceDTO){
    return toSha256(device.guid).substring(32)
}

export function encryptSymetricDeviceMessage(message : DeviceOperationDTO<unknown>) : string {
    const device = get<DeviceDTO>(SessionKeys.DEVICE);
    const chyperKey = getDeviceSymmetricKey(device)
    const stringfiedJson = JSON.stringify(message)
    const encrypted = CryptoJS.AES.encrypt(stringfiedJson, chyperKey).toString()
    return encrypted;
}

export function newKey (deviceAuth : AuthDTO) {
    return new Promise<string>(resolve => {
        const keys = chyper.generateKeyPairSync('rsa', {
            modulusLength: 2048,
            publicKeyEncoding: {
                type: 'spki',
                format: 'pem',
            },
            privateKeyEncoding: {   
                type: 'pkcs8',
                format: 'pem',
            },
        });
        
        const _privateKey = keys.privateKey

        const _publicKey = keys.publicKey
        const guid = chyper.randomUUID();

        const device = new DeviceDTO(
            deviceAuth.id,
            deviceAuth.publicKey,
            _privateKey,
            _publicKey,
            guid
        )

        set<DeviceDTO>(SessionKeys.DEVICE, device);

        resolve(btoa(_publicKey.toString()))  
    })
}