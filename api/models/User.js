'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: 'Username is required'
    },
    password: {
        type: String,
        required: 'Password is required'
    },
    role: {
        type: String
    }
}, 
    { collection: 'users' }
);

module.exports = mongoose.model('User', UserSchema);