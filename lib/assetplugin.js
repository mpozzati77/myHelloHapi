'use strict'

const assetServiceModule = require('@darkever/assetservice')
const memdb = require('memdb');
const Joi = require('joi');

module.exports.register = function(server, options, next) {

    var assetService = new assetServiceModule(memdb());

    function addAsset(request, reply) {
        var name = request.query.assname;

        var asset = {
            name: name
        }

        assetService.addAsset(asset, function(err) {
            if (err) return reply(err);
            reply("Asset added successfully!");
        });
    }

    function modifyState(request, reply) {
        assetService.modifyState();
    }

    function getState(request, reply) {
        assetService.getState();
    }

    server.route({
        method: 'GET',
        path: '/asset/add',
        handler: addAsset,
        config: {
            validate: {
                query: {
                    assname: Joi.string().min(3).max(10).lowercase()
                }
            }
        }
    })
    server.route({ method: 'GET', path: '/asset/modify', handler: modifyState })
    server.route({ method: 'GET', path: '/asset/getState', handler: getState })

    next()
}

module.exports.register.attributes = {
    name: 'assetplugin',
    version: '1.0.0'
}