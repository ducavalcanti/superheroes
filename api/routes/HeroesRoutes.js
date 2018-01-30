'use strict';

module.exports = function(app){
    var heroesController = require('../controllers/heroesController');

    app.route('/heroes')
        .get(heroesController.listHeroes)
        .post(heroesController.createHero);

    app.route('/heroes/:id')
        .get(heroesController.getHero)
        .put(heroesController.updateHero)
        .delete(heroesController.deleteHero);
};