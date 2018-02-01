var User = require('../models/User');
var bcrypt = require('bcryptjs');
var mongoose = require('mongoose');
var acl = require('acl');

exports.createFirstUser = function(request, response){
    User.findOne({username: 'admin'}, function(error, user){
        if (user){
            return response.status(500).send('User admin was already created.');
        } else {
            var hashedPassword = bcrypt.hashSync('admin', 8);
            var newUser = new User({
                username: 'admin',
                password: hashedPassword
            });
            newUser.save(function (error, user){
                if (error)
                    return response.status(500).send(error);
                acl = new acl(new acl.mongodbBackend(mongoose.connection.db));
                acl.addUserRoles(user.id, 'admin', function (error){
                    if (error)
                        return response.status(500).send(error);
                });
                return response.status(200).send(user);
            });
        }
    });
};

exports.createUser = function(request, response){
    var hashedPassword = bcrypt.hashSync(request.body.password, 8);    
    var user = new User(
        {
            username: request.body.username,
            password: hashedPassword,
            role: 'standard'
        }
    );

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