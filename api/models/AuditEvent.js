'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AuditEventSchema = new Schema({
    entity: {
        type: String,
        required: 'Entity is required',
        unique: true
    },
    entityId: {
        type: String,
        required: 'Entity id is required'
    },
    datetime: {
        type: Date,
        default: Date.now()
    },
    username: {
        type: String,
        required: 'Username is required'
    },
    action: {
        type: String,
        required: 'String is required'
    }
}, 
{
    collection: 'events'
});

module.exports = mongoose.model('AuditEvent', AuditEventSchema);