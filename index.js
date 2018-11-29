"use strict";

// подключаем фреймвок express
let express = require('express');
let app = express();
var routes = require('./routes');
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use('/', routes);

// слушаем на порту 5005 или другом свободном
let port = process.env.PORT || 5055;
app.listen(port);
console.log("Server works on port " + port);
