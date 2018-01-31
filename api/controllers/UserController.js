var User = require('../models/User');
var bcrypt = require('bcryptjs');

exports.createUser = function(request, response){
    var hashedPassword = bcrypt.hashSync(request.body.password, 8);
    var newUser = new User(
        {
            username: request.body.username,
            password: hashedPassword,
        }
    );
    
    newUser.save(function (error, user){
        if (error)
            response.send(error);
        response.send(user);
    });
};

exports.listUsers = function(request, response){
    User.find({}, function(error, users){
        if (error)
            response.send(error);
        response.send(users);
    });
};


exports.getUser = function(request, response){
    User.findById(request.params.id, function (error, user){
        if (error)
            response.send(error);
        if (!user)
            response.send("User not found.");
        else
            response.json(user);
    });
};

exports.deleteUser = function(request, response){
    User.findByIdAndRemove(request.params.id, function(error, user){
        if (error)
            response.send(error)
        if (!user)
            response.send("User doesn't exist.")
        else
            response.json(user);        
    });
};

exports.updateUser = function(request, response){ // Try changing to 'patch' latter on
    User.findByIdAndUpdate(request.params.id, request.body, {new: true}, function(error, user){
        if (error)
            response.send(error)
        response.json(user)
    });
};