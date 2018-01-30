'use strict';

module.exports = function(app){
    var PowersController = require('../controllers/PowersController');

    app.route('/powers')
        .get(PowersController.listPowers)
        .post(PowersController.createPower);

    app.route('/powers/:powerId')
        .get(PowersController.getPower)
        .put(PowersController.updatePower)
        .delete(PowersController.deletePower);
};