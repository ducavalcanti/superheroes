/**
 * Routes for User endpoints
 */

var authentication = require('../../aaa/ValidateToken');
var authorization = require('../../aaa/AuthorizationMiddleware');

module.exports = function(router){
    var usersController = require('../controllers/UserController');

    router.get('/users', [authentication(), authorization('read')], usersController.listUsers);
    router.post('/users', [authentication(), authorization('create')], usersController.createUser);

    router.get('/users/:username', [authentication(), authorization('read')], usersController.getUser);
    router.put('/users/:username', [authentication(), authorization('update')], usersController.updateUser);
    router.delete('/users/:username', [authentication(), authorization('delete')], usersController.deleteUser);

    router.get('/setup', usersController.createFirstUser);
};