'use strict';

var Hero = require('../models/Hero');

exports.listHeroes = function(request, response){
    Hero.find({}, function(error, heroes){
        if (error)
            response.send(error);
        response.json(heroes);
    });
}

exports.createHero = function(request, response){
    var newHero = new Hero(request.body);
    newHero.save(function(error, hero){
        if (error)
            response.send(error);
        response.json(hero);
    });
}

exports.getHero = function(request, response){
    Hero.findById(request.params.id, function(error, hero){
        if (error)
            response.send(error)
        response.json(hero);
    });
}

exports.updateHero = function(request, response){
    Hero.findOneAndUpdate({_id: request.params.id}, request.body, {new: true}, function(error, hero){
        if (error)
            response.send(error)
        response.json(hero);
    });
}

exports.deleteHero = function(request, response){
    Hero.remove({_id: request.params.id}, function(error, hero){
        if (error)
            response.send(error)
        response.json(hero);
    });
}