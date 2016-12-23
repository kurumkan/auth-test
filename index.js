var express = require('express');
var http = require('http');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var mongoose = require('mongoose');
var app = express();
var router = require('./router');

//morgan - logging framework
app.use(morgan('combined'));
app.use(bodyParser.json({type:'*/*'}));

router(app);



const PORT = process.env.PORT||5000;
const server=http.createServer(app);
server.listen(PORT);
console.log('Server has started. Port '+PORT)




