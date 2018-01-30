'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProtectionAreaSchema = new Schema({
    name: {
        type: String,
        unique: true,
        required: 'Name is required'
    },
    lat: {
        type: Float32Array,
        required: 'Latitude is required'
    },
    long: {
        type: Float32Array,
        required: 'Longitude is required'
    },
    radius: {
        type: Float32Array,
        required: 'Radius is required'
    },
    protectedBy: {
        type: Schema.ObjectId, ref: 'Hero'
    }
    
},
    {collection: 'areas'}
);

module.exports = mongoose.model('ProtectionArea', ProtectionAreaSchema);