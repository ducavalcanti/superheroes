/** Authorization Routes */
module.exports = function(router){
    var AuthController = require('./AuthController');
    
    router.post('/auth/login', AuthController.login);
};

