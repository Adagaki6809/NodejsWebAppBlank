'use strict';
var path = require('path');
var express = require('express');
var favicon = require('serve-favicon');
var fs = require('fs');
var bodyParser = require('body-parser');
require('http');
const router = express.Router();
var app = express();

var staticPath = path.join(__dirname, '/');
app.use(express.static(staticPath));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.append('Access-Control-Allow-Origin', ['*']);
    res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.append('Access-Control-Allow-Headers', 'Content-Type');
    res.append('Content-Type', 'text/plain; charset=utf-8');
    res.append('Content-Security-Policy', 'connect-src http://localhost:3000/');
    next();
});

// Allows you to set port in the project properties.
app.set('port', process.env.PORT || 3000);

app.listen(app.get('port'), function () {
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
    router.writeHead({'Access-Control-Allow-Origin': '*', 'Content-Type': 'text/plain; charset=utf-8'});
    res.sendFile(path.join(__dirname, 'index.html'));
});

router.get('/favicon.ico',(req, res) => {
    res.sendFile(favicon(path.join(__dirname, 'favicon.ico')));
});

router.get('/images/:image_id', function (req, res) {
        res.sendFile(path.join(__dirname, images[req.params.image_id]))
    });

router.post('/upload', (request, response) => {
    const { Client } = require('pg');
    console.log(process.env.DATABASE_URL);
    const client = new Client({
      connectionString:
        process.env.DATABASE_URL, 
        ssl: {
          rejectUnauthorized: false
        }
    });

    client.connect();
    let text = [];
    client.query(request.body.queryToDB, (err, res) => {
      if (err) throw err;
      for (let row of res.rows) {
        text.push(row);
      }
      client.end();
      response.send(text);
    });
});

setTimeout(()=>console.log("!!!!!!!!!!!!!!!!"), 15000);
app.use('/', router);
