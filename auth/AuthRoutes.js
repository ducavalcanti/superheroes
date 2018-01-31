'use strict';

module.exports = function(router){
    var AuthController = require('./AuthController');

    router.post('/auth/login', AuthController.login);
    router.get('/auth/me', AuthController.getToken);
};

