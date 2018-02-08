'use strict';

var Hero = require('../models/Hero');
var pageNum = 0;
var pageSize = 10;

exports.listHeroes = function(request, response){

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
        pageSize = parseInt(pp, 10);
    }

    Hero.find({})
        .limit(pageSize)
        .skip(pageSize * pageNum)
        .sort({name: 'asc'})
        .populate('powers')
        .exec(function(error, heroes){
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
    Hero.findOne({_id: request.params.id}).populate('powers').exec(function(error, hero){
        if (error){
            response.send(error);
        } else {
            response.json(hero);
        }
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