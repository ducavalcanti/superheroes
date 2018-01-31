'use strict';

var express = require('express');
var app = express();
var db = require('./db');
const acl = require('express-acl');
var tokenValidator = require('./auth/ValidateToken');

acl.config({
    filename:'nacl.json',
    defaultRole: 'admin'
});

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// Routes
var routes = express.Router();
var authRoutes = require('./auth/AuthRoutes');
var userRoutes = require('./api/routes/UserRoutes');
var heroRoutes = require('./api/routes/HeroesRoutes');
var powerRoutes = require('./api/routes/PowersRoutes');

authRoutes(routes);
routes.use(tokenValidator);

routes.use(acl.authorize.unless({
    path: ['/auth']
}));

userRoutes(routes);
heroRoutes(routes);
powerRoutes(routes); 

app.use('/', routes);

module.exports = app;