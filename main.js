const { app, BrowserWindow, ipcMain, Notification, clipboard } = require('electron');
const server = require('./src/server/index.js')

const url = require("url");
const path = require("path");

let mainWindow

function createWindow() {
	mainWindow = new BrowserWindow({
		width: 500,
		height: 350,
		titleBarStyle: 'hiddenInset',
		autoHideMenuBar: true,
		maximizable: false,
		backgroundColor: 'transparent',
		webPreferences: {
			nodeIntegration: true,
			contextIsolation: false,
		},
		resizable: false,
		transparent: true
	})

	mainWindow.loadURL(
		url.format({
			pathname: path.join(__dirname, `./dist/index.html`),
			protocol: "file:",
			slashes: true
		})
	);

	mainWindow.on('closed', function () {
		mainWindow = null
	})

	global.onWsReceive = (ws, data) => {
		console.log('received')
		clipboard.writeText(data.password)
		new Notification({
			title: 'HashPass',
			body: `Senha ${data.title} copiada com sucesso!`,
			icon: './src/img/logo-back-light.png'
		}).show()
	}
}

app.on('ready', () => {
	server.start().then(_server => {
		global.Server = _server
		createWindow()
		console.log(global.onWsReceive)
	})
})

app.on('window-all-closed', function () {
	if (process.platform !== 'darwin') app.quit()
})

app.on('activate', function () {
	if (mainWindow === null) createWindow()
})