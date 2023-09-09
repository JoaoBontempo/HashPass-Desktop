import { contextBridge, ipcRenderer } from "electron"
import { ExposedKeys } from "./interface/exposedKeys"

export default function setBridge(){
    contextBridge.exposeInMainWorld('api', {
      sendMessage: (data : string) => ipcRenderer.send(ExposedKeys.SOCKET_MESSAGE, data),
      close: () => ipcRenderer.send(ExposedKeys.CLOSE),
      minimize: () => ipcRenderer.send(ExposedKeys.MINIMIZE)
    })
}
