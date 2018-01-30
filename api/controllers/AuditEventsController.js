'use strict';

var Hero = require('../models/AuditEvent');

exports.createEvent = function(request, response){
    var newHero = new Hero(request.body);
    newHero.save(function(error, hero){
        if (error)
            response.send(error);
        response.json(hero);
    });
}