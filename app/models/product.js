'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProductSchema = new Schema({

    name: {
        type: String,
        required: true
    },

    description: {
        type: String,
        default: ''
    }
    
});

module.exports = mongoose.model('Product', ProductSchema);