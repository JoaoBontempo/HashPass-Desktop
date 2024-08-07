import { BrowserWindow, ipcMain } from "electron";
import HashPassSocket from "./server/socket";
import { get } from "./session";
import { SessionKeys } from "./interface/session/sessionKeys";
import { ExposedKeys } from './interface/exposedKeys'
import { BrowserPasswordFile } from "../src/ts/browserExportOption";
import DeviceOperationDTO from "./interface/device/deviceOperationDTO";
import { DeviceOperation } from "./interface/device/deviceOperation";

export default function handleIpc() {
    socketMessage()
    close()
    minimize()
    importFile()
}

function socketMessage(){
    ipcMain.on(ExposedKeys.SOCKET_MESSAGE, (_, data) => {
        const socket = get<HashPassSocket>(SessionKeys.SOCKET);
        socket.sendMessage(data)
    })
}

function close(){
    ipcMain.on(ExposedKeys.CLOSE, (_) => {
        const window = get<BrowserWindow>(SessionKeys.WINDOW);
        window.close()
    })
}

function minimize() {
    ipcMain.on(ExposedKeys.MINIMIZE, (_) => {
        const window = get<BrowserWindow>(SessionKeys.WINDOW);
        window.minimize()
    })
}

function importFile() {
    ipcMain.on(ExposedKeys.BROWSER_IMPORT, (_, browserCsv : BrowserPasswordFile[]) => {
        const socket = get<HashPassSocket>(SessionKeys.SOCKET);
        socket.sendMessage({
            data: browserCsv,
            success: true,
            operation: DeviceOperation.BROWSER_FILE,
        } as DeviceOperationDTO<BrowserPasswordFile[]>)
    })
}