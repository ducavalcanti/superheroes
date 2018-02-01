'use strict';

var express = require('express');
var app = express();
var tokenValidator = require('./aaa/ValidateToken');
var authorize = require('./aaa/AuthorizationMiddleware');
// var authorizationController = require('./aaa/AuthorizationController');

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// Setup database
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/superheroes', setupAuthorization);

// Authorization callback
function setupAuthorization(error, db){
    setupRoles();
    setupRoutes();
}

function setupRoles(){
    // Roles
}

function setupRoutes(){
    // Routes
    var routes = express.Router();
    var authRoutes = require('./aaa/AuthRoutes');
    var userRoutes = require('./api/routes/UserRoutes');
    var heroRoutes = require('./api/routes/HeroesRoutes');
    var powerRoutes = require('./api/routes/PowersRoutes');
    var rolesRoutes = require('./api/routes/RolesRoutes');

    authRoutes(routes);
    routes.use(tokenValidator);
    userRoutes(routes, authorize);
    heroRoutes(routes);
    powerRoutes(routes);
    rolesRoutes(routes); 

    app.use('/', routes);
}

// Generic debug logger for node_acl
function logger() {
    return {
        debug: function( msg ) {
            console.log( '-DEBUG-', msg );
        }
    };
}

module.exports = app;