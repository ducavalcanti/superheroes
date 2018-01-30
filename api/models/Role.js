'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var RoleSchema = new Schema({
    name: {
        type: String,
        unique: true,
        required: 'Username is required'
    }   
}, 
    { collection: 'roles' }
);

module.exports = mongoose.model('Role', RoleSchema);