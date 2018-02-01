var Power = require('../models/Power');
var Hero = require('../models/Hero');

exports.listPowers = function(request, response){
    Power.find({}, function(error, powers){
        if (error)
            response.send(error);
        response.json(powers);
    });
}

exports.createPower = function(request, response){
    if (!request.body.heroId)
        return response.status(500).send('heroId is required.');
    var heroId = request.body.heroId;
    var newPower;
    var hero = Hero.findById(heroId, function(error, hero){
        newPower = new Power(request.body);
        newPower.save(function(error, power){
            if (error)
                return response.send(error);
        });
    });
    
    hero.powers.push(newPower);
    hero.save(function(error, hero){
        if (error)
            return response.status(500).send(error);
    });
    return response.json(power);
}

exports.getPower = function(request, response){
    Power.findById(request.params.powerId, function(error, power){
        if (error)
            response.send(error)
        response.json(power);
    });
}

exports.updatePower = function(request, response){
    Power.findOneAndUpdate({_id: request.params.powerId}, request.body, {new: false}, function(error, power){
        if (error)
            response.send(error)
        response.json(power);
    });
}

exports.deletePower = function(request, response){
    Power.remove({_id: request.params.powerId}, function(error, power){
        if (error)
            response.send(error)
        response.json(power);
    });
}