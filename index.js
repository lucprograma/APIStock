const express = require('express');
const routes = require('./routes');
jwt = require('jsonwebtoken');
token = require('./config/token');
require('./database/db');

const app = express();
const port = 3002;
app.set('key', token.key);
app.use(express.json());
app.get('/', (req, res) => { res.send('API MongoDB'); });
routes(app);
app.listen(port, () => { console.log('uploaded server in ' +  port); });