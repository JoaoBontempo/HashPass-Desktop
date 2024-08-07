import DeviceOperationDTO from "../interface/device/deviceOperationDTO";
import PasswordDTO from "../interface/passwordDTO";
import HashPassSocket from "./socket";
import { clipboard, Notification } from "electron";

export default {
    'COPY' : (_ : HashPassSocket, deviceData : DeviceOperationDTO<any>) => showCopiedPassword(JSON.parse(deviceData.data) as PasswordDTO),
    'SHOW' : () => {},
    'BROWSER_FILE' : () => {},
    'EXCHANGE_KEY' : () => {}
}

function showCopiedPassword(copiedPassword : PasswordDTO){
    clipboard.writeText(copiedPassword.password)
    new Notification({
        title: 'HashPass',
        body: `Senha ${copiedPassword.title} copiada com sucesso!`,
    }).show()
}