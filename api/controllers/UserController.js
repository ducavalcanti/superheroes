var User = require('../models/User');
var Role = require('../models/Role');
var bcrypt = require('bcryptjs');
var mongoose = require('mongoose');
var ac = require('../../aaa/AuthorizationController');

exports.createFirstUser = function(request, response){
    User.findOne({username: 'admin'}, function(error, user){
        if (user){
            return response.status(500).send('User admin was already created.');
        } else {
            var standardRole = new Role({name: 'standard'});                    
            standardRole.save(function(error, role){
                if (error) 
                    console.log('Error saving role');
            });

            var adminRole = new Role({name: 'admin'});
            adminRole.save(function(error, role){
                if (error) 
                    console.log('Error saving role');                
            });

            var hashedPassword = bcrypt.hashSync('admin', 8);
            var newUser = new User({
                username: 'admin',
                password: hashedPassword
            });

            // Pushing created roles to new admin user
            newUser.roles.push(standardRole);
            newUser.roles.push(adminRole);
            newUser.save(function (error, user){
                if (error)
                    return response.status(500).send(error);
                return response.status(200).send(user);
            });
        }
    });
};

exports.createUser = function(request, response){
    var hashedPassword = bcrypt.hashSync(request.body.password, 8);
    var role = Role.findOne({name: 'standard'}, function (error, role){
        return response.status(404).send('Could not find standard role to assign to this new user profile. Use /setup first.');
    });
    
    var user = new User(
        {
            username: request.body.username,
            password: hashedPassword,
        }
    );

    user.roles.push(role);
    user.save(function (error, user){
        if (error)
            return response.send(error);
        return response.send(user);
    });
};

exports.listUsers = function(request, response){
    User.find({}, function(error, users){
        if (error)
            return response.send(error);
        return response.send(users);
    });
};


exports.getUser = function(request, response){
    User.findOne({username: request.params.username}, function (error, user){
        if (error)
            return response.send(error);
        if (!user)
            return response.send("User not found.");
        else
            return response.json(user);
    });
};

exports.deleteUser = function(request, response){
    User.findOneAndRemove({username: request.params.username}, function(error, user){
        if (error)
            return response.send(error)
        if (!user)
            return response.send("User doesn't exist.")
        else
            return response.json(user);        
    });
};

exports.updateUser = function(request, response){ // Try changing to 'patch' latter on
    request.body.password = bcrypt.hashSync(request.body.password, 8);
    User.findOneAndUpdate({username: request.params.username}, request.body, {new: true}, function(error, user){
        if (error)
            return response.send(error)
        return response.json(user)
    });
};

exports.checkRoles = function(request, response){
    User.findOne({username: request.params.username}).populate('roles').exec(function(error, user){
        if (error)
            return response.status(500).send(error);
        return response.status(200).json(user.roles);
    });
}