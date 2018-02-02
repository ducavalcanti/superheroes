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
    if (!request.params.heroId)
        response.status(500).send('heroId is required.');
    else {
        var powerObject = {name: request.body.name, description: request.body.description};
        var powerModel = new Power(powerObject);
        powerModel.save(function(error, power){
            if (error)
                return response.send(error);
        });

        Hero.findByIdAndUpdate(request.params.heroId, {$push: {powers: powerObject}}, {safe: true, upsert: true}, function(error, hero){
            if (error)
                return response.status(500).send(error);
            else
                return response.status(404).json({'message': 'Could not create power. Hero with this heroId not found.'});
        });
    }
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