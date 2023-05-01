const { ipcRenderer } = require( "electron" );

let test =  document.getElementById('ip')

test.innerText = ipcRenderer.sendSync('serverip')