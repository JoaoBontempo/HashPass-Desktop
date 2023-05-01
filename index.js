try {
    require('electron-reloader')(module)
} catch (_) {}

const server = require('./server/index.js')
const { app, BrowserWindow } = require('electron')
const { ipcMain } = require( "electron" );
const dashboard = require('./dashboard.js')

let loadingWindow

const createWindow = () => {
    loadingWindow = new BrowserWindow({
        width: 600,
        height: 300,
        frame: false,
        resizable: false,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        }
    })
    loadingWindow.setMenuBarVisibility(false)
    loadingWindow.loadFile('./src/view/index.html')
}

app.whenReady().then(() => {
    
  	createWindow()

    ipcMain.on('wsStart', (event, _) => {
        server.start().then(_server => {
            global.Server = _server
            event.sender.send('wsRun', _server.ip)
            dashboard.show()
            loadingWindow.close()
        })
    })
})