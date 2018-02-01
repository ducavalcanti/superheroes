'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

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