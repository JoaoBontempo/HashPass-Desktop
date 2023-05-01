const { ipcRenderer, remote } = require( "electron" );


ipcRenderer.send('wsStart')
ipcRenderer.on('wsRun', (event, server) => {  
    
})