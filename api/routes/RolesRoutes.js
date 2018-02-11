/**
 * Routes for Roles endpoints
 */

module.exports = function(router, authorize){
    var rolesController = require('../controllers/RolesController');

    router.get('/roles/:username', rolesController.checkRoles);
};