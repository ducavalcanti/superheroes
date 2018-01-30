'use strict';

var express = require('express');
var app = express();
var db = require('./db');

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// Routes
var userRoutes = require('./api/routes/UserRoutes');
var heroRoutes = require('./api/routes/HeroesRoutes');
var powerRoutes = require('./api/routes/PowersRoutes');

userRoutes(app);
heroRoutes(app);
powerRoutes(app);

module.exports = app;