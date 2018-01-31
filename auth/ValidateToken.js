var jwt = require('jsonwebtoken');
var config = require('../config');

function validateToken(request, response, next) {
  var token = request.headers['x-access-token'];
  
  if (!token) {
    return response.status(403).send({ auth: false, message: 'No token provided.' });
  }
  
  jwt.verify(token, config.secret, function(error, decoded) {
    if (error) {
        return response.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
    } else {
      // Save the decoded user in request for later usage
      request.decoded = decoded;
      next();
    }
  });
}

module.exports = validateToken;