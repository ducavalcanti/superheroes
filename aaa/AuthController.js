var User = require('../api/models/User');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var config = require('../config');


/** Returns the id of an authenticated user */
exports.getUserId = function(request, response, next) {
  if (request.decoded){
    return request.decoded.id;
  }
  return false;
}

/** Logs in the user by providing an username and password */
exports.login = function(request, response) {
  var username = request.body.username;
  var password = request.body.password;
  const expiresIn = 86400; // expires in 24 hours

  if (username == null || password == null)
    return response.status(500).send('Username and Password are needed');
  
  User.findOne({ username: request.body.username }, function (error, user) {
    if (error) 
      return response.status(500).send(error);
    if (!user) 
      return response.status(404).send('No user found');
    
    // Validate password
    var passwordIsValid = bcrypt.compareSync(request.body.password, user.password);
    
    if (!passwordIsValid) 
      return response.status(401).send({ auth: false, token: null });
    
    // Return token
    var token = jwt.sign({ id: user._id }, config.secret, {
      expiresIn: expiresIn
    });
    response.status(200).send({ auth: true, token: token, expiresIn: expiresIn}); 
  });
}