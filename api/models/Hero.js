/**
 * The Super Hero Model
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/**
 * ProtectionArea Schema
 * @constructor ProtectionArea
 */
var ProtectionAreaSchema = new Schema({
    name: {
        type: String,
        unique: true,
        required: 'Name is required'
    },
    lat: {
        type: Number,
        required: 'Latitude is required'
    },
    long: {
        type: Number,
        required: 'Longitude is required'
    },
    radius: {
        type: Number,
        required: 'Radius is required'
    }
});

mongoose.model('ProtectionArea', ProtectionAreaSchema);

/**
 * Super Hero Schema
 * @constructor Hero
 */
var HeroSchema = new Schema({
    name: {
        type: String,
        required: 'Hero name is required',
        unique: true
    },
    alias: {
        type: String,
        required: 'Alias (human common name) is required'
    },
    powers: [{
        type: Schema.ObjectId, ref: 'Power'
    }],
    protectionArea: {type: Schema.ObjectId, ref: 'ProtectionArea'}
}, 
{
    collection: 'heroes'
});

module.exports = mongoose.model('Hero', HeroSchema);
