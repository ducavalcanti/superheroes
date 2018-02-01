var ac = require('../../aaa/AuthorizationMiddleware');

module.exports = function(router, authorize){
    var usersController = require('../controllers/UserController');

    router.get('/users', ac('read'), usersController.listUsers);
    router.post('/users', usersController.createUser);

    router.get('/users/:username', usersController.getUser);
    router.put('/users/:username', usersController.updateUser);
    router.delete('/users/:username', usersController.deleteUser);

    router.get('/setup', usersController.createFirstUser);
};