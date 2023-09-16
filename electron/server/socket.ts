import api from './api'
import http from 'http'
import ip from 'ip';
import expressWs from 'express-ws'
import { decryptAssymetricDeviceMessage, decryptSymetricDeviceMessage, encryptSymetricDeviceMessage } from './auth';
import DeviceOperationDTO from '../interface/device/deviceOperationDTO';
import process from './process';

export default class HashPassSocket {
    userWsConnection : any;

    constructor(){
        this.start()
    }

    start() {
        console.log('Initializing socket')
        const serverAddress = ip.address()
        const server = http.createServer(api)
        const socket = expressWs(api, server)   

        socket.app.ws('/', (ws, _) => {
            console.log('New connection!')
            ws.send('')

            ws.on('message', (message : string) => {
                console.log('Received message: ' + message)
                this.processMessage(decryptSymetricDeviceMessage(message))
            })   

            ws.on('close', () => {
                console.log('connection closed')
            })

            this.userWsConnection = ws
        })

        server.listen(3000, serverAddress, () => {
            console.log('Running: ' + serverAddress)
        })
    }

    sendMessage(data : DeviceOperationDTO<unknown>) {
        const deviceMessage = encryptSymetricDeviceMessage(data)
        this.userWsConnection.send(deviceMessage)
    }

    processMessage(deviceData : DeviceOperationDTO<any>) {
        process[deviceData.operation](this, deviceData)
    }

}