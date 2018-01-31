'use strict';

var validateToken = require('./ValidateToken');

module.exports = function(app){
    var AuthController = require('./AuthController');

    app.post('/auth/login', AuthController.login);

    app.get('/auth/me', validateToken, AuthController.getToken);

    app.post('/role/:username/:role', validateToken, AuthController.addRole);
};

