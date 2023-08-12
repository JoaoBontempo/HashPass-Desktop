const auth = require('./auth.js')
const express = require('express'); 
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const app = express();
 
app.use(cors({ origin: '*' }));
 
app.use(helmet());
 
app.use(express.json());
 
app.use(morgan('dev'));
 
app.post('/', (req, res, next) => {
    const authDTO = req.body

    if(!authDTO.id || !authDTO.publicKey) {
        res.sendStatus(400)
        return
    }

    auth.newKey(authDTO.id, authDTO.publicKey).then(publicKey => {
        res.json({ publicKey: publicKey });
    })
});
 
module.exports = app;