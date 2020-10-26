'use strict';
var path = require('path');
var express = require('express');
var favicon = require('serve-favicon');
var fs = require('fs');
var bodyParser = require('body-parser');
const router = express.Router();
var app = express();

var staticPath = path.join(__dirname, '/');
app.use(express.static(staticPath));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Allows you to set port in the project properties.
app.set('port', process.env.PORT || 3000);

var server = app.listen(app.get('port'), function () {
    console.log('listening');
});

const testFolder = './images/';  
var images = {};
fs.readdir(testFolder, (err, files) => {
    files.forEach((file) => {
	images[file] = (testFolder + file);
    });
});

router.get('/',(req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

router.get('/favicon.ico',(req, res) => {
    res.sendFile(favicon(path.join(__dirname, 'favicon.ico')));
});

router.get('/images/:image_id', (req, res) => {
    res.sendFile(path.join(__dirname, images[req.params.image_id]));
});

router.post('/test', (req, res) => {
    res.writeHead(200, {'Content-Type': 'text/plain; charset=utf-8'});
    res.end('Сервер отвечает:\n\tВведённое имя - ' + req.body.first_name);
});

app.use('/', router);