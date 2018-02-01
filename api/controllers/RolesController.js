var User = require('../models/User');
var Role = require('../models/Role');
var bcrypt = require('bcryptjs');
var mongoose = require('mongoose');

exports.checkRoles = function(request, response){
    User.findOne({username: request.params.username}).populate('roles').exec(function(error, user){
        if (error)
            return response.status(500).send(error);
        return response.status(200).json(user.roles);
    });
}