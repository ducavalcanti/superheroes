/**
 * User Role model
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/**
 * Role Schema
 * @constructor Role
 */
var RoleSchema = new Schema({
    name: {
        type: String,
        unique: true,
        required: 'Role name is required',
    },
}, 
    { collection: 'roles' }
);

module.exports = mongoose.model('Role', RoleSchema);