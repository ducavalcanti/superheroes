/**
 * Routes for Super Powers endpoints
 */
var authentication = require('../../aaa/ValidateToken');
var authorization = require('../../aaa/AuthorizationMiddleware');

module.exports = function(router){
    var PowersController = require('../controllers/PowersController');

    router.get('/powers', [authentication(), authorization('read')], PowersController.listPowers);
    router.post('/powers/:heroId', [authentication(), authorization('create')], PowersController.createPower);

    router.get('/powers/:powerId', [authentication(), authorization('read')], PowersController.getPower);
    router.put('/powers/:powerId', [authentication(), authorization('update')], PowersController.updatePower);
};