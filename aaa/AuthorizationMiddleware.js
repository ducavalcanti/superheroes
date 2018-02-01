var User = require('../api/models/User');
var Role = require('../api/models/Role');

module.exports = function(action){
    return function(request, response, next) {
        var section = request.path.split('/')[0];
        if (request.decoded){
            var userId = request.decoded.id;
            var user = User.findById(userId, function(error, user){
                if (user){
                    roles = user.roles;
                    for (var i = 0; i< user.roles.length; i++){
                        if (checkPermission(user.roles[i].name, section, action)){
                            next();
                        }
                    }
                }
            });
        } else {
        return response.status(401).json({result: 'Token not found'});
        }
    }
} 

function checkPermission(role, section, action){
    switch (role){
        case 'admin':
            return true;
        case 'standard':
            switch (section){
                case 'users':
                    if (['read'].indexOf(action) >= 0){
                        return true;
                    }
                    break;
                case 'powers':
                    if (['read'].indexOf(action) >= 0){
                        return true;
                    }
                    break;                    
            }            
    }
    return false;
}