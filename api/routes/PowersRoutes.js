'use strict';

module.exports = function(router){
    var PowersController = require('../controllers/PowersController');

    router.get('/powers', PowersController.listPowers);
    router.post('/powers', PowersController.createPower);

    router.get('/powers/:powerId', PowersController.getPower);
    router.put('/powers/:powerId', PowersController.updatePower);
    router.delete('/powers/:powerId', PowersController.deletePower);        
};