'use strict';

var express = require('express');
var app = express();
var tokenValidator = require('./aaa/ValidateToken');

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// Setup database
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/superheroes', setupAuthorization);

// Authorization callback
function setupAuthorization(error, db){
    setupRoutes();
}

function setupAudit(){
    require('./api/controllers/AuditEventsController');
}

function setupRoutes(){
    // Routes
    var routes = express.Router();
    var authRoutes = require('./aaa/AuthRoutes');
    var userRoutes = require('./api/routes/UserRoutes');
    var heroRoutes = require('./api/routes/HeroesRoutes');
    var powerRoutes = require('./api/routes/PowersRoutes');
    var rolesRoutes = require('./api/routes/RolesRoutes');
    var auditRoutes = require('./api/routes/AuditEventsRoutes');

    authRoutes(routes);
    userRoutes(routes);
    heroRoutes(routes);
    powerRoutes(routes);
    rolesRoutes(routes); 
    auditRoutes(routes);

    app.use('/', routes);

    setupAudit();
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