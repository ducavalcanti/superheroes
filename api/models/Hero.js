'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

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
    }] 
}, 
{
    collection: 'heroes'
});

module.exports = mongoose.model('Hero', HeroSchema);