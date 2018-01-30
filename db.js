'use strict';
''
var port = process.env.PORT || 3000;
var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/superheroes');