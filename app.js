'use strict';

var express = require('express');
var app = express();
var tokenValidator = require('./aaa/ValidateToken');

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// Setup database
var mongoose = require('mongoose');
var nodeAcl = require('acl');
var acl;

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/superheroes', setupAuthorization);

// Authorization callback
function setupAuthorization(error, db){
    var mongoBackend = new nodeAcl.mongodbBackend(db);
    acl = new nodeAcl(mongoBackend, logger());

    setupRoles();
    setupRoutes();
}

function setupRoles(){
    // ACL Rules
    acl.allow([
        {
            roles: 'admin',
            allows: [
                {resources: ['users', 'powers', 'heroes', 'auth', 'roles'], permissions: '*'}
            ]
        },
        {
            roles: 'standard',
            allows: [
                {resources: ['heroes', 'powers'], permissions: 'get'},
                {resources: ['auth'], permissions: ['get', 'post']}
            ]
        },
    ]);
    acl.addRoleParents( 'admin', 'standard' );
}

function setupRoutes(){
    // Routes
    var routes = express.Router();
    var authRoutes = require('./aaa/AuthRoutes');
    var userRoutes = require('./api/routes/UserRoutes');
    var heroRoutes = require('./api/routes/HeroesRoutes');
    var powerRoutes = require('./api/routes/PowersRoutes');

    authRoutes(routes);
    routes.use(tokenValidator);
    userRoutes(routes, acl);
    heroRoutes(routes);
    powerRoutes(routes); 

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