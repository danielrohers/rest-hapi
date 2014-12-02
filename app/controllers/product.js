'use strict';

var log = require('winston');
var Model = require('../models/product');

var _cb = function(data, reply){
    var code = data.code
  
    if (code === 500) {
        log.error('Internal error(%d): %s', code, data.error);
    }

    return reply(data).code(code);
}

module.exports = {

    list : function (request, reply) {
        Model.find({}, function (err, data) {
            if (!err) {
                return _cb({ code: 200, data: data }, reply);
            }
      
            return _cb({ code: 500, error: err.message }, reply);
        });
    },

    create : function (request, reply) {
        var model = new Model(request.payload);
        model.save(function (err, data) {
            if (!err) {
                return _cb({ code: 200, data: data }, reply);
            }

            return _cb({ code: 500, error: err.message }, reply);
        });
    },

    show : function (request, reply) {
        Model.findById(request.params.id, function (err, data) {
            if (!data) {
                return _cb({ code: 404, error: 'Not found' }, reply);
            }

            if (!err) {
                return _cb({ code: 200, data: data }, reply);
            }

            return _cb({ code: 500, error: err.message }, reply);
        });
    },

    update : function (request, reply) {
        Model.findById(request.params.id, function (err, data) {
            if (!data) {
                return _cb({ code: 404, error: 'Not found' }, reply);
            }

            var model = request.payload;

            data.name = model.name;
            data.description = model.description;

            data.save(function (err) {
                if (!err) {
                    return _cb({ code: 200, data: data }, reply);
                }

                return _cb({ code: 500, error: err.message }, reply);
            });
        });
    },

    delete : function (request, reply) {
        var query = { _id : request.params.id }
        Model.remove(query, function(err, data) {
            if (!data) {
                return _cb({ code: 404, error: 'Not found' }, reply);
            }

            if (!err) {
                return _cb({ code: 200 }, reply);
            }

            return _cb({ code: 500, error: err.message }, reply);
        });
    }

}