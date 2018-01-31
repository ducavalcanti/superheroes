'use strict';

module.exports = function(router){
    var heroesController = require('../controllers/HeroesController');

    router.get('/heroes', heroesController.listHeroes)
    router.post('/heroes', heroesController.createHero)
        
    router.get('/heroes/:id', heroesController.getHero)
    router.put('/heroes/:id', heroesController.updateHero)
    router.delete('/heroes/:id', heroesController.deleteHero);
};