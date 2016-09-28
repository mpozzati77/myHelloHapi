'use strict'

const asset = require('@darkever/assetservice')

module.exports.register = function(server, options, next) {
    function addAsset(request, reply) {
        asset.addAsset();
    }

    function modifyState(request, reply) {
        asset.modifyState();
    }

    function getState(request, reply) {
        asset.getState();
    }

    server.route({ method: 'GET', path: '/asset/add', handler: addAsset })
    server.route({ method: 'GET', path: '/asset/modify', handler: modifyState })
    server.route({ method: 'GET', path: '/asset/getState', handler: getState })

    next()
}

module.exports.register.attributes = {
    name: 'assetplugin',
    version: '1.0.0'
}