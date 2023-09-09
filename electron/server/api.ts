import express from 'express';
import cors from 'cors';
import helmet from 'helmet'
import morgan from 'morgan'
import AuthDTO from '../interface/authDTO';
import { newKey } from './auth';

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

export default api;