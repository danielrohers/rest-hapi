// Bring Mongoose into the app
var mongoose = require('mongoose');
var log = require('winston');

// Build the connection string
var uri = 'mongodb://localhost/rest-hapi';

// Create the database connection
mongoose.connect(uri);

// CONNECTION EVENTS
// When successfully connected
mongoose.connection.on('connected', function () {
    log.info('Mongoose default connection open to ' + uri);
});

// If the connection throws an error
mongoose.connection.on('error',function (err) {
    log.error('Mongoose default connection error: ' + err);
});

// When the connection is disconnected
mongoose.connection.on('disconnected', function () {
    log.info('Mongoose default connection disconnected');
});

// When the connection is open
mongoose.connection.once('open', function () {
    log.info('Mongoose default connection is open')
});

// If the Node process ends, close the Mongoose connection
process.on('SIGINT', function() {
    mongoose.connection.close(function () {
        log.info('Mongoose default connection disconnected through app termination');
        process.exit(0);
    });
});