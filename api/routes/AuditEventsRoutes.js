/**
 * Routes for Audit Events endpoints
 */
var authorization = require('../../aaa/AuthorizationMiddleware');

module.exports = function(router){
    var aeController = require('../controllers/AuditEventsController');

    router.get('/subscribe', aeController.eventStream);
};