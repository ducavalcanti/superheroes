/**
 * Routes for Roles endpoints
 */
var authentication = require('../../aaa/ValidateToken');
var authorization = require('../../aaa/AuthorizationMiddleware');

module.exports = function(router){
    var rolesController = require('../controllers/RolesController');

    router.get('/roles/:username', [authentication(), authorization('read')], rolesController.checkRoles);
};