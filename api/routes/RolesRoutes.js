/**
 * Routes for Roles endpoints
 */

var ac = require('../../aaa/AuthorizationMiddleware');

module.exports = function(router, authorize){
    var rolesController = require('../controllers/RolesController');

    router.get('/roles/:username', ac('read'), rolesController.checkRoles);
};