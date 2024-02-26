const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');

const app = express();


//Settings
app.set('default_port', 3000);

//Middlewares
app.use(morgan('dev'));
app.use(cors());
app.use(express.json({limit: '10mb'}));
app.use(express.urlencoded({extended: false}));

//routes
app.use('/api/mail', require('./routes/mailRoute'));
app.use('/api/fileManipulation', require('./routes/fileManipulationRoute'));

module.exports = app;