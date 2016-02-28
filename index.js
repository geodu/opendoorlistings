var express = require('express');
var app = express();

var mongoose = require('mongoose');
var connectionString = process.env.OPENSHIFT_MONGODB_DB_URL || 'mongodb://localhost/opendoor';
mongoose.connect(connectionString);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
var Listing = require('./models/listing');

app.use('/listings', function(req, res) {
    Listing.getListings(req.query, function(json) {
        res.json(json);
    });
});

app.use('/', function(req, res) {
    res.send('API Endpoint is at /listings');
});

app.listen(process.env.OPENSHIFT_NODEJS_PORT || 8080,
           process.env.OPENSHIFT_NODEJS_IP);
