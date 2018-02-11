/**
 * Routes for Heroes endpoints
 */

var ac = require('../../aaa/AuthorizationMiddleware');

module.exports = function(router){
    var heroesController = require('../controllers/HeroesController');

    router.get('/heroes', ac('read'), heroesController.listHeroes);
    router.post('/heroes', ac('create'), heroesController.createHero);
        
    router.get('/heroes/:id', ac('read'), heroesController.getHero);
    router.post('/heroes/:id/area/', ac('create'), heroesController.createProtectionArea); 
    router.put('/heroes/:id', ac('update'), heroesController.updateHero);
    router.delete('/heroes/:id', ac('delete'), heroesController.deleteHero);
};