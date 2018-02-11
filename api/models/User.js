/**
 * User model
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/**
 * User schema
 * @constructor User
 */
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
    roles: [{
        type: Schema.ObjectId, ref: 'Role'
    }] 
}, 
    { collection: 'users' }
);

module.exports = mongoose.model('User', UserSchema);