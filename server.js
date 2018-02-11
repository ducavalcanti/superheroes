'use strict';

var app = require('./app');

var port = process.env.PORT || 8080;

var server = app.listen(port, function() {
    console.log('Super Hero Catalogue RESTful API server started on port: ' + port);
});

var io = require('socket.io').listen(server);

io.on('connection', function(socket){
    console.log('A user connected.');
    var AuditEvent = require('./api/models/AuditEvent');
    AuditEvent.schema.on('newEvent', function(event){
        var json = {
            auditId: event.id,
            user: event.username,
            entityType: event.entity,
            entityId: event.entityId,
            action: event.action
        }
        socket.emit('auditEvent', json);
    });
});