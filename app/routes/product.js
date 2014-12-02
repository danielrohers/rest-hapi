module.exports = function (server) {

    'use strict';

    var product = require('../controllers/product');

    // list
    server.route({
        method: 'GET',
        path: '/',
        handler: product.list
    });

    // create
    server.route({
        method: 'POST',
        path: '/',
        handler: product.create
    });

    // show
    server.route({
        method: 'GET',
        path: '/{id}',
        handler: product.show
    });

    // update
    server.route({
        method: 'PUT',
        path: '/{id}',
        handler: product.update
    });

    // delete
    server.route({
        method: 'DELETE',
        path: '/{id}',
        handler: product.delete
    });

}