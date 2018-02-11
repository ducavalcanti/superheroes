var User = require('../models/User');
var Role = require('../models/Role');
var bcrypt = require('bcryptjs');
var mongoose = require('mongoose');
var aeController = require('../controllers/AuditEventsController');

/** Creates the first API user */
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

/** Creates a single user and assigns the role 'standard' to him */
exports.createUser = function(request, response){
    var hashedPassword = bcrypt.hashSync(request.body.password, 8);
    Role.findOne({name: 'standard'}, function (error, role){
        if (role){
            var user = new User(
                {
                    username: request.body.username,
                    password: hashedPassword,
                }
            );
        
            user.roles.push(role);
            user.save(function (error, user){
                if (error){
                    response.status(500).send(error);
                } else {
                    aeController.createEvent(request, 'User', user.id, 'create');
                    response.status(200).send(user);
                }
                response.end();        
            });
        } else {
            response.status(404).send('Could not find standard role to assign to this new user profile. Use /setup first.');            
        }        
    });
};

/** Lists all users */
exports.listUsers = function(request, response){
    User.find({}, function(error, users){
        if (error){
            response.status(500).send(error);
        } else {
            response.status(200).send(users);
        }
        response.end();        
    });
};

/** Gets a single user */
exports.getUser = function(request, response){
    User.findOne({username: request.params.username}, function (error, user){
        if (error){
            response.status(500).send(error);
        } else {
            if (!user){
                response.status(404).send("User not found.");
            } else {                
                response.status(200).json(user);
            }
        }
        response.end();
    });
};

/** Deletes a single user */
exports.deleteUser = function(request, response){
    User.findOneAndRemove({username: request.params.username}, function(error, user){
        if (error){
            response.status(500).send(error);
        } else {
            if (!user){
                response.status(404).send("User doesn't exist.")
            } else {
                aeController.createEvent(request, 'User', user.id, 'delete');
                response.status(200).json(user);
            }
        }            
    });
};


/** Updates a single user */
exports.updateUser = function(request, response){ // Try changing to 'patch' latter on
    request.body.password = bcrypt.hashSync(request.body.password, 8);
    User.findOneAndUpdate({username: request.params.username}, request.body, {new: true}, function(error, user){
        if (error){
            response.status(500).send(error);
        } else {
            aeController.createEvent(request, 'User', user.id, 'update');
            response.status(200).json(user);
        }
    });
};
