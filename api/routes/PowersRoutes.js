/**
 * Routes for Super Powers endpoints
 */

var ac = require('../../aaa/AuthorizationMiddleware');

module.exports = function(router){
    var PowersController = require('../controllers/PowersController');

    router.get('/powers', ac('read'), PowersController.listPowers);
    router.post('/powers/:heroId', ac('create'), PowersController.createPower);

    router.get('/powers/:powerId', ac('read'), PowersController.getPower);
    router.put('/powers/:powerId', ac('update'), PowersController.updatePower);
};