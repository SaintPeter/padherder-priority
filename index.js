'use strict';
var server = require('express');
var app = server();
var fs = require('fs');
var path = require('path');
var request = require('request');
//require('dotenv').config({silent: true});

// Setup Port
var port = process.env.PORT || 8080;

// Server
app.listen(port, function () {
  console.log("Listening on port: " + port);
});


/* ---------------------- Routes --------------------------- */

app.get('/', function (req, res) {
  var fileName = path.join(__dirname, 'index.html');
  res.sendFile(fileName, function (err) {
    if (err) {
      console.log(err);
      res.status(err.status).end();
    }
    else {
      console.log('Sent:', fileName);
    }
  });
});

app.get('/script.js', function (req, res) {
  var fileName = path.join(__dirname, 'script.js');
  res.sendFile(fileName, function (err) {
    if (err) {
      console.log(err);
      res.status(err.status).end();
    }
    else {
      console.log('Sent:', fileName);
    }
  });
});

app.get('/:filename.json', function (req, res) {
  var fileName = path.join(__dirname, req.params['filename'] + '.json');
  res.sendFile(fileName, function (err) {
    if (err) {
      console.log(err);
      res.status(err.status).end();
    }
    else {
      console.log('Sent:', fileName);
    }
  });
});

app.get('/user/:username', function (req, res) {
  var requestURL = "http://padherder.com/user-api/user/" + req.params['username'];
  request(requestURL,{ json: true },function(error, response, data) {
    if(!error && response.statusCode == 200) {
      // Return response
      res.json(data);
    } else {
      console.log("Search Error: ", error);
      res.status(400).json({ error: error });
    }
  });
});
