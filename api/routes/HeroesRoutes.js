/**
 * Routes for Heroes endpoints
 */
var authentication = require('../../aaa/ValidateToken');
var authorization = require('../../aaa/AuthorizationMiddleware');

module.exports = function(router){
    var heroesController = require('../controllers/HeroesController');

    router.get('/heroes', [authentication(), authorization('read')], heroesController.listHeroes);
    router.post('/heroes', [authentication(), authorization('create')], heroesController.createHero);
        
    router.get('/heroes/:id', [authentication(), authorization('read')], heroesController.getHero);
    router.post('/heroes/:id/area/', [authentication(), authorization('create')], heroesController.createProtectionArea); 
    router.put('/heroes/:id', [authentication(), authorization('update')], heroesController.updateHero);
    router.delete('/heroes/:id', [authentication(), authorization('delete')], heroesController.deleteHero);
};