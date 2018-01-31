'use strict';

var express = require('express');
var app = express();
var acl = require('./db');

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

module.exports = acl;

// Routes
var userRoutes = require('./api/routes/UserRoutes');
var heroRoutes = require('./api/routes/HeroesRoutes');
var powerRoutes = require('./api/routes/PowersRoutes');
var authRoutes = require('./auth/AuthRoutes');

userRoutes(app);
heroRoutes(app);
powerRoutes(app); 
authRoutes(app);

module.exports = app;