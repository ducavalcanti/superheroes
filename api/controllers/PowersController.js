var User = require('../models/Power');

exports.listPowers = function(request, response){
    Power.find({}, function(error, powers){
        if (error)
            response.send(error);
        response.json(powers);
    });
}

exports.createPower = function(request, response){
    var newPower = new Power(request.body);
    newPower.save(function(error, power){
        if (error)
            response.send(error);
        response.json(power);
    });
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