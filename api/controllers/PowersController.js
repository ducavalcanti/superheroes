var Power = require('../models/Power');
var Hero = require('../models/Hero');
var perPage = 10;
var pageNum = 0;

exports.listPowers = function(request, response){
    
    // Validates if page param exists. If so, assign it later
    // TODO: validate if param is a number (integer)
    var pg = request.params.pageNumber;
    if (pg){
        pageNum = parseInt(pg, 10);
    }
    
    // Validates if perPage param exists. If so, assign it later
    // TODO: validate if param is a number (integer)
    var pp = request.params.pageSize;
    if (pp){
        perPage = parseInt(pp, 10);
    }

    Power.find({})
        .limit(perPage)
        .skip(perPage * pageNum)
        .sort({
            name: 'asc'
        }).exec(function(error, powers){
            if (error){
                response.send(error);
            } else {
                response.send(powers);
            }
        });
}

exports.createPower = function(request, response){
    if (!request.params.heroId){
        response.status(500).send('heroId is required.');
        return response.end();
    } else {
        Hero.findById(request.params.heroId, function(error, hero){
            var powerObject = {name: request.body.name, description: request.body.description};
            
            var power = new Power(powerObject);
            power.save(function(error, pwr){
                if (error){
                    response.status(500).send(error);
                    return response.end();
                }
            });

            hero.powers.push(power);
            hero.save(function(error, hero){
                if (error){
                    response.status(500).send(error);
                } else {
                    response.status(200).send(hero);
                }
                response.end();
            });            
        });        
    }
}

exports.getPower = function(request, response){
    Power.findById(request.params.powerId, function(error, power){
        if (error)
            response.send(error);
        response.json(power);
    });
}

exports.updatePower = function(request, response){
    Power.findOneAndUpdate({_id: request.params.powerId}, request.body, {new: true}, function(error, power){
        if (error)
            response.send(error);
        response.json(power);
    });
}

// exports.deletePower = function(request, response){
//     Power.findById(request.params.powerId, function(error, power){
//         if (error){
//             response.status(500).send(error);
//         } else {
//             if (power){
//                 power.remove({_id: request.params.powerId}, function(error, power){
//                     if (error){
//                         response.send(error);
//                     } else {
//                         response.json(power);
//                     }                    
//                 });
//                 response.status(200).json(power);
//             } else {
//                 response.status(404).send("Power not found.");
//             }
//         }
//         response.end();
//     });
// }