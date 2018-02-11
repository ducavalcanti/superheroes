/**
 * Routes for User endpoints
 */

var ac = require('../../aaa/AuthorizationMiddleware');

module.exports = function(router){
    var usersController = require('../controllers/UserController');

    router.get('/users', ac('read'), usersController.listUsers);
    router.post('/users', ac('create'), usersController.createUser);

    router.get('/users/:username', ac('read'), usersController.getUser);
    router.put('/users/:username', ac('update'), usersController.updateUser);
    router.delete('/users/:username', ac('delete'), usersController.deleteUser);

    router.get('/setup', usersController.createFirstUser);
};