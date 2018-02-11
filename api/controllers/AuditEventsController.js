var mongoose = require('mongoose');
var AuditEvent = require('../models/AuditEvent');
var User = mongoose.model('User');

/** Function used to register an audit event in the database 
 * @param {string} entitiType - Represents the type of the entity ('Hero', 'Power', etc.)
 * @param {string} entityId - The id of the entity that is being changed
 * @param {string} action - The action being done to the entity ('create', 'delete' or 'update')
*/
exports.createEvent = function(request, entityType, entityId, action){
    User.findById(request.decoded.id, function(error, user){
        var aEvent = new AuditEvent({
            entity: entityType,
            entityId: entityId,
            username: user.username,
            action: action
        });
        
        aEvent.save(function(error, ae){
            if (error){
                console.log('Could not save audit event.');
            } else {
                console.log('AuditEvent registered successfully. User: ' 
                + user.username + ' - EntityType: ' + entityType + ' - EntityId: ' + entityId + ' - Action: ' + action);                
            }
        });
    });
}

/** Function used to register clients and notify them of new audit events */
exports.eventStream = function(request, response){
    var path = require('path');
    response.sendFile(path.resolve(__dirname + '/../../templates/events.html'));
}