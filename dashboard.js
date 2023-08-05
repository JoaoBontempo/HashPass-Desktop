const { BrowserWindow, ipcMain, Notification, clipboard } = require('electron');

function buildDashboard() {
    let dashboard = new BrowserWindow({
        width: 500,
        height: 350,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        },
        frame: false,
        menu: null,
        resizable: false
    })
    dashboard.loadFile('./src/view/dashboard.html')
}

exports.show = () => {
    ipcMain.on('serverip', (event, ip) => {
        event.returnValue = global.Server.ip
    })

    global.onReceive = (ws, data) => {
        let passwordData = JSON.parse(data)
        clipboard.writeText(passwordData.password)
        new Notification({
            title: 'HashPass',
            body: `Senha ${passwordData.title} copiada com sucesso!`,
            icon: './src/img/logo-back-light.png'
        }).show()


    }
    
    let dashboard = buildDashboard()
}