const express = require('express');
const bodyParser = require('body-parser');
const path =  require('path');
const cors =  require('cors');
const logger =  require('morgan');
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.static("../client/build"));
app.use(bodyParser.urlencoded({extended: true}));
var jwt = require('jsonwebtoken');
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(logger('dev'));
require('./models/db');
// app.get('/', function(req, res){
//     res.send('hello note app');
// })
process.env.SECRET_KEY = 'secret';
const API = require('./routes/authApi');
const NOTE = require('./routes/noteApi');
app.use('/',API);
app.use('/',NOTE);

const port = process.env.port || 3000;
app.listen(port,()=>{
    console.log('port is listing in', port);
});


