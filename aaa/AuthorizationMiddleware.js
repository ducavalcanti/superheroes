var User = require('../api/models/User');
var Role = require('../api/models/Role');


/** Middleware used to authorize users based on their roles 
 * @param {string} action - The action being done to the entity ('read', 'create', 'delete' or 'update')
*/
module.exports = function(action){
    return function(request, response, next) {
        var section = request.path.split('/')[1];
        if (request.decoded){
            var userId = request.decoded.id;
            var user = User.findById(userId).populate('roles').exec(function(error, user){
                if (user){
                    var roles = user.roles;
                    for (var i = 0; i< user.roles.length; i++){
                        if (checkPermission(user.roles[i].name, section, action)){
                            return next();                            
                        } 
                    }                    
                } 
                response.status(401).json({result: 'You do not have permission to access this content.'});
                response.end();
            });
        } else {
            response.status(401).json({result: 'Token not found'});
            response.end();
        }
    }    
} 


/** Function used check if a user has permissions to access the required resource 
 * @param {string} role - Represents the role of the user ('standard' or 'admin')
 * @param {string} section - The entity (API section) that is being accessed
 * @param {string} action - The action required ('create', 'read', 'update' or 'delete')
*/
function checkPermission(role, section, action){
    switch (role){
        case 'admin':
            return true;
        case 'standard':
            switch (section){
                case 'powers':
                    if (['read'].indexOf(action) >= 0){
                        return true;
                    }
                    break;                    
                case 'heroes':
                    if (['read'].indexOf(action) >= 0){
                        return true;
                    }
                    break;
                case 'subscribe':
                    if (['read'].indexOf(action) >= 0){
                        return true;
                    }
                    break;
            }            
    }
    return false;
}