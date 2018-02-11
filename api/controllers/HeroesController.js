'use strict';

var mongoose = require('mongoose');
var aeController = require('../controllers/AuditEventsController');
var Hero = require('../models/Hero');
var Power = require('../models/Power');
var pageNum = 0;
var pageSize = 10;

/** Paginated list of Super Heroes */
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

/** Creates a single super hero */
exports.createHero = function(request, response){
    var newHero = new Hero(request.body);
    newHero.save(function(error, hero){
        if (error){
            response.status(500).send(error);
        } else {
            aeController.createEvent(request, 'Hero', hero.id, 'create');
            response.status(200).json(hero);
        }
    });
}

/** Gets a single super hero*/
exports.getHero = function(request, response){
    Hero.findOne({_id: request.params.id}).populate('powers').populate('protectionArea').exec(function(error, hero){
        if (error){
            response.status(500).send(error);
        } else {
            response.status(200).json(hero);
        }
        response.end();
    });
}

/** Creates a protection area for a single hero */
exports.createProtectionArea = function(request, response){
    Hero.findOne({_id: request.params.id}, function(error, hero){
        if (error){
            response.status(500).send(error);            
        } else {
            var ProtectionArea = mongoose.model('ProtectionArea');
            var pArea = new ProtectionArea({
                name: request.body.name,
                lat: request.body.lat,
                long: request.body.long,
                radius: request.body.radius
            });
            pArea.save(function(error, area){
                if (error){
                    aeController.createEvent(request, 'ProtectionArea', area.id, 'create');
                    response.status(500).send(error);
                    return response.end();
                }
            });

            hero.protectionArea = pArea;
            hero.save(function(error, hero){
                if (error){
                    response.status(500).send(error);
                } else {
                    hero.populate('protectionArea');
                    response.status(200).send(hero);
                }
                response.end();
            });            
        }        
    });
}

/** Updates a single super hero */
exports.updateHero = function(request, response){
    Hero.findOneAndUpdate({_id: request.params.id}, request.body, {new: true}, function(error, hero){
        if (error){
            response.status(500).send(error);
        } else {
            if (hero){
                aeController.createEvent(request, 'Hero', hero.id, 'update');
                response.status(200).json(hero);
            } else {
                response.status(404).json({result: 'Hero not found'});
            }            
        }
    });
}


/** Deletes a single super hero and all powers associated */
exports.deleteHero = function(request, response){
    var id = request.params.id;
    if (id){
        Hero.findOne({_id: request.params.id}).populate('powers').exec(function(error, hero){
            if (hero){
                hero.powers.forEach(function (power, index){
                    Power.remove({_id: power._id}, function(error, pwr){
                        if (error){
                            console.log('Could not delete power.');
                        } else {
                            if (pwr.n === 1){
                                aeController.createEvent(request, 'Power', power.id, 'delete');                                
                            }
                        }
                    });
                });
                
                Hero.remove({_id: request.params.id}, function(error, hero){
                    if (error){
                        response.status(500).send(error);
                    } else {
                        if (hero.n === 1){
                            aeController.createEvent(request, 'Hero', request.params.id, 'delete');
                            response.status(200).json({result: 'Hero with id ' + request.params.id + ' was successfully deleted.'});
                        } else {
                            response.status(404).json({result: 'Hero not found.'});
                        }            
                    }            
                });
            } else {
                response.status(404).json({result: 'Hero not found.'});
            }            
        });
    }
}