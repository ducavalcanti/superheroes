'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PowerSchema = new Schema({
    name: {
        type: String,
        unique: true,
        required: 'Name is required'
    },
    description: {
        type: String,
        required: 'Description is required'
    },
},
    {collection: 'powers'}
);

module.exports = mongoose.model('Power', PowerSchema);