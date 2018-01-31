'use strict';

var app = require('./app');
var port = process.env.PORT || 3000;

var server = app.listen(port, function() {
    console.log('Super Hero Catalogue RESTful API server started on port: ' + port);
});