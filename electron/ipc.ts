import { BrowserWindow, ipcMain } from "electron";
import HashPassSocket from "./server/socket";
import { get } from "./session";
import { SessionKeys } from "./interface/session/sessionKeys";
import { ExposedKeys } from './interface/exposedKeys'

export default function handleIpc() {
    socketMessage()
    close()
    minimize()
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