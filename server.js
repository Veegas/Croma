var express = require('express');
var app = express();
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/test');
var db = mongoose.connection;




app.use(express.static(__dirname + '/public'));

app.listen(3000);
console.log("server is running on port 3000");