const ip = require('ip')
const app = require('./app');
const appWs = require('./app-ws');

class HashPassServer {
    constructor(){

    }

    start() {
        return new Promise(resolve => {
            console.log('started')
            const serverAddress = ip.address()
            console.log('Address: ' + serverAddress)
            const server = app.listen(3000, serverAddress, () => {
                let wsServer = appWs(server)
                resolve({ ip: serverAddress, server: wsServer })
            })
        })
    }
}

module.exports = new HashPassServer();