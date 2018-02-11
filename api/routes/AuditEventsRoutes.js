/**
 * Routes for Audit Events endpoints
 */
var ac = require('../../aaa/AuthorizationMiddleware');

module.exports = function(router, authorize){
    var aeController = require('../controllers/AuditEventsController');

    router.post('/subscribe', ac('read'), aeController.eventStream);
};