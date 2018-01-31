'use strict';
''
var port = process.env.PORT || 3000;
var mongoose = require('mongoose');
var nodeAcl = require('acl');
var acl;

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/superheroes');

mongoose.connection.on('connected', function(){
    acl = new nodeAcl(new nodeAcl.mongodbBackend(mongoose.connection.db));
    acl.allow([
        {
            roles: 'admin',
            allows: [
                {resources: ['users', 'powers', 'heroes', 'auth'], permissions: '*'}
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
});

module.exports = acl;
