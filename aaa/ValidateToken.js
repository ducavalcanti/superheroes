var jwt = require('jsonwebtoken');
var config = require('../config');

/** Middleware used to validate if an access token is valid */
module.exports = function(){
    return function validateToken(request, response, next) {
        var token = request.headers['x-access-token'];
    
        if (!token) {
            response.status(403).send({ auth: false, message: 'No token provided.' });
            response.end()
        }
    
        jwt.verify(token, config.secret, function(error, decoded) {
            if (error) {
                response.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
                response.end()
            } else {
                // Save the decoded user in request for later usage
                request.decoded = decoded;
                next();    
            }
        });
    }        
}