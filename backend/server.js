require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const fileupload = require('express-fileupload');

const router = require('./src/routes');

/* Connecting to the database. */
mongoose.connect(process.env.DATABASE_URL);

mongoose.Promise = global.Promise;
mongoose.connection.on('error', (e) => {
  console.log('Error: ', e.message);
});

const server = express();

server.use(cors());
server.use(express.json());
server.use(express.urlencoded({extended: true}));
server.use(fileupload());
server.use(express.static(__dirname + '/public'));

server.use('/', router);

server.listen(process.env.PORT, () => {
  console.log('Express server listening on base: ', process.env.BASE_URL);
});
