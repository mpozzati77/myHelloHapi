#! /usr/bin/env node

'use strict'

const Hapi = require('hapi')
const xtend = require('xtend')
const minimist = require('minimist')
const memdb = require('memdb');
const level = require('level');
const defaults = {
    port: 8989
}

function build(opts, cb) {
    opts = xtend(defaults, opts)

    const server = new Hapi.Server()

    var db = opts.db;
    if (!db && opts.path) {
        db = level(opts.path)
    } else if (!db) {
        db = memdb();
    }

    server.connection({ port: opts.port })

    server.register([{
            register: require('./lib/assetplugin'),
            options: {
                db
            }
        },
        require('./lib/myplugin')
    ], (err) => {
        cb(err, server)
    })

    return server
}

function start(opts) {
    build(opts, (err, server) => {
        if (err) { throw err }

        server.start(function(err) {
            if (err) { throw err }

            console.log('Server running at:', server.info.uri)
        })
    })
}

module.exports = build

if (require.main === module) {
    start(minimist(process.argv.slice(2), {
        integer: 'port',
        alias: {
            'port': 'p'
        }
    }))
}