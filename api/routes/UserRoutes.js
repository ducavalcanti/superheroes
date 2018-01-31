'use strict';

// var validateToken = require('../../auth/ValidateToken');

module.exports = function(router){
    var usersController = require('../controllers/UserController');

    router.get('/users', usersController.listUsers);
    router.post('/users', usersController.createUser);

    router.get('/users/:username', usersController.getUser);
    router.put('/users/:username', usersController.updateUser);
    router.delete('/users/:username', usersController.deleteUser);
};