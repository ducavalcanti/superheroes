'use strict';

module.exports = function(app){
    var usersController = require('../controllers/UserController');

    app.route('/users')
        .get(usersController.listUsers)
        .post(usersController.createUser);

    app.route('/users/:id')
        .get(usersController.getUser)
        .put(usersController.updateUser)
        .delete(usersController.deleteUser);
};