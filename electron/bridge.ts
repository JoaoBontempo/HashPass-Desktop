import { contextBridge, ipcRenderer } from "electron"
import { ExposedKeys } from "./interface/exposedKeys"
import { BrowserPasswordFile } from "../src/ts/browserExportOption"

export default function setBridge(){
    contextBridge.exposeInMainWorld('api', {
      importBrowserFile: (browserCsv : BrowserPasswordFile[] ) => ipcRenderer.send(ExposedKeys.BROWSER_IMPORT, browserCsv),
      sendMessage: (data : string) => ipcRenderer.send(ExposedKeys.SOCKET_MESSAGE, data),
      close: () => ipcRenderer.send(ExposedKeys.CLOSE),
      minimize: () => ipcRenderer.send(ExposedKeys.MINIMIZE)
    })
}
