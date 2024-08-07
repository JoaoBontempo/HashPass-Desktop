import express from 'express';
import cors from 'cors';
import helmet from 'helmet'
import morgan from 'morgan'
import AuthDTO from '../interface/authDTO';
import { encryptAssymetricDeviceMessage, newKey } from './auth';
import { get } from '../session';
import DeviceDTO from '../interface/device/deviceDTO';
import { SessionKeys } from '../interface/session/sessionKeys';
import DeviceOperationDTO from '../interface/device/deviceOperationDTO';
import { ExchangeKeyDTO } from '../interface/device/deviceTypes';
import { DeviceOperation } from '../interface/device/deviceOperation';

const api = express();
 
api.use(cors({ origin: '*' }));
 
api.use(helmet());
 
api.use(express.json());
 
api.use(morgan('dev'));
 
api.post('/', (req, res, _) => {
    console.log('Requested public key')
    const authDTO = req.body as AuthDTO;

    if(!authDTO.id || !authDTO.publicKey) {
        res.sendStatus(400)
        return
    }

    newKey(authDTO).then(publicKey => {
        res.json({
            publicKey : publicKey
        })
    })

});

api.get('/key', (_req, res, _) => {
    const device = get<DeviceDTO>(SessionKeys.DEVICE)

    if (!device) {
        res.sendStatus(401);
        return
    }

    const exchangeKeyDTO = {
        operation: DeviceOperation.EXCHANGE_KEY,
        success: true,
        message: 'Guid has been exported sucessfully!',
        data: {
            guid : device.guid
        }
    } as DeviceOperationDTO<ExchangeKeyDTO>

    const chyperedGuid = encryptAssymetricDeviceMessage(exchangeKeyDTO)
    console.log('Sending GUID')
    res.json({
        key: chyperedGuid
    })
})

export default api;