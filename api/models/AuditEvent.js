/** 
 * The AuditEvent model
*/
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/** 
 * AuditEventSchema
 * @constructor AuditEvent
 */
var AuditEventSchema = new Schema({
    entity: {
        type: String,
        required: 'Entity is required'
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

/** Hooks to the post (save) and emits to clients */
AuditEventSchema.post('save', function (event) {
    AuditEventSchema.emit('newEvent', event);
});

module.exports = mongoose.model('AuditEvent', AuditEventSchema);

