/*
"webpack": "^4.23.1",
"webpack-cli": "^3.1.2"
*/

'use strict';
var path = require('path');
var express = require('express');
var fs = require('fs');

var app = express();

var staticPath = path.join(__dirname, '/');
app.use(express.static(staticPath));

// Allows you to set port in the project properties.
app.set('port', process.env.PORT || 3000);

var server = app.listen(app.get('port'), function () {
    console.log('listening');
});

    const testFolder = './images/';  
    var images = [];
    fs.readdir(testFolder, (err, files) => {
        files.forEach((file) => {
            images.push(testFolder + file);
        });
        console.log('adding images');
    });
//module.exports.images = images;

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //Максимум не включается, минимум включается
  }

var i = 0;
app.get("/*.png", (req, res) => {
    res.sendFile(path.join(__dirname, images[getRandomInt(0,100)]));
    i++;
  });
