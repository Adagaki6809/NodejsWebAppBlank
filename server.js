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
    var images = {};
    var imagesHTML = "";
    fs.readdir(testFolder, (err, files) => {
        files.forEach((file) => {
            images[file] = (testFolder + file);
            imagesHTML += "<img src='" + file + "' />";
        });
        console.log('adding images');
    });
    
//module.exports.images = images;

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //Максимум не включается, минимум включается
  }


app.get("/images/:image_id", (req, res) => {
    //res.writeHead(200, {'Content-type':'text/html'});
    //res.end(imagesHTML);
    res.sendFile(path.join(__dirname, images[req.params.image_id]));
    
  });
