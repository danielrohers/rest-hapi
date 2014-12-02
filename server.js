'use strict';

var Hapi = require('hapi');

var port = process.env.PORT || 3000;
var server = new Hapi.Server('localhost', port);

// config routes
var routes = require('./config/routes')(server);

// config mongoose
var mongoose = require('./config/mongoose');

module.exports = server;
