'use strict'

const asset = require('@darkever/assetservice')

module.exports.register = function(server, options, next) {
    function addAsset(request, reply) {

    }

    function modifyState(request, reply) {}

    function getState(request, reply) {}

    server.route({ method: 'GET', path: '/asset/add', handler: addAsset })
    server.route({ method: 'GET', path: '/asset/modify', handler: modifyState })
    server.route({ method: 'GET', path: '/asset/getState', handler: getState })

    next()
}

module.exports.register.attributes = {
    name: 'assetplugin',
    version: '1.0.0'
}