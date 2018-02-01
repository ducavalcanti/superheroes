module.exports = function(router, authorize){
    var rolesController = require('../controllers/RolesController');

    router.get('/roles/:username', rolesController.checkRoles);
    
    // todo: assign role to a user
    // router.get('/roles/:username/:role', rolesController.assignRole);
};