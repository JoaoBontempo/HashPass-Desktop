const WebSocket = require('ws');
const auth = require('./auth.js')

global.onReceive = onMessage

function onError(ws, err) {
    console.error(`onError: ${err.message}`);
}
 
function onMessage(ws, data) {
    auth.decryptDeviceMessage(data.toString())
        .then((message) => {
            console.log(message)
        }).catch(error => {
            ws.send(error.toString())
        })
}
 
function onConnection(ws, req) {
    ws.on('message', data => onMessage(ws, data));
    ws.on('error', error => onError(ws, error));
    //ws.close() close the connection if the device is not authorized
    ws.send(JSON.stringify(global.connectedDevice))
}
 
module.exports = (server) => {
    const wss = new WebSocket.Server({
        server
    });
 
    wss.on('connection', onConnection);
    return wss;
}