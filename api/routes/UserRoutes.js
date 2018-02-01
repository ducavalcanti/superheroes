var auth = require('../../aaa/AuthController');
 
module.exports = function(router, acl){
    var usersController = require('../controllers/UserController');

    router.get('/users', acl.middleware(2, auth.getUserId), usersController.listUsers);
    router.post('/users', acl.middleware(2, auth.getUserId), usersController.createUser);

    router.get('/users/:username', acl.middleware(), usersController.getUser);
    router.put('/users/:username', acl.middleware(), usersController.updateUser);
    router.delete('/users/:username', acl.middleware(), usersController.deleteUser);

    router.get('/setup', usersController.createFirstUser);
};