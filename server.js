'use strict';
var path = require('path');
var express = require('express');
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
    
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //Максимум не включается, минимум включается
}

router.get('/',(req, res) => {
  res.sendFile("index.html");
});

router.get('/images/:image_id', (req, res) => {
    res.sendFile(path.join(__dirname, images[req.params.image_id]));
});

router.post('/test', (req, res) => {
    var name = "Сервер отвечает:\n\tВведённое имя - " + req.body.first_name;
    res.sendFile("test.html");
    res.end("Сервер отвечает");
});

app.use('/', router);