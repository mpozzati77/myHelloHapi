'use strict'

const assetServiceModule = require('@darkever/assetservice')
const memdb = require('memdb');
const Joi = require('joi');

module.exports.register = function(server, options, next) {

    var assetService = new assetServiceModule(memdb());

    function addAsset(request, reply) {
        var asset = {
            name: request.query.assname,
            state: 0
        }

        assetService.addAsset(asset, function(err) {
            if (err) return reply(err);
            reply("Asset added successfully!");
        });
    }

    function modifyState(request, reply) {
        var asset = {
            name: request.query.name,
            state: request.query.state
        }

        assetService.modifyState(asset, function(err) {
            if (err) return reply(err);
            reply("Asset updated successfully!");
        });
    }

    function getState(request, reply) {
        var name = request.query.assname;

        var asset = {
            name: name
        }

        assetService.getState(asset, function(err, state) {
            if (err) return reply(err);
            console.log(state);
            reply("state: " + state);
        });
    }

    server.route({
        method: 'GET',
        path: '/asset/add',
        handler: addAsset,
        config: {
            validate: {
                query: {
                    assname: Joi.string().required().min(3).max(10).lowercase()
                }
            }
        }
    })
    server.route({
        method: 'GET',
        path: '/asset/modify',
        handler: modifyState,
        config: {
            validate: {
                query: {
                    name: Joi.string().required().min(3).max(10).lowercase(),
                    state: Joi.number().required().integer().min(0).max(2)
                }
            }
        }
    })
    server.route({ method: 'GET', path: '/asset/getState', handler: getState })

    next()
}

module.exports.register.attributes = {
    name: 'assetplugin',
    version: '1.0.0'
}