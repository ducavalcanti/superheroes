'use strict';

var app = require('./app');
var port = process.env.PORT || 8080;

var server = app.listen(port, function() {
    console.log('Super Hero Catalogue RESTful API server started on port: ' + port);
});