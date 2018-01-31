var jwt = require('jsonwebtoken');
var config = require('../config');

function validateToken(request, response, next) {
  var token = request.headers['x-access-token'];
  if (!token)
    return response.status(403).send({ auth: false, message: 'No token provided.' });
  jwt.verify(token, config.secret, function(error, decoded) {
    if (error)
        return response.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
    
    // Save the userId in the request for later usage
    request.userId = decoded.id;
    console.log('Token Middleware: token validated successfully');
    next();
  });
}

module.exports = validateToken;