var mongoose = require('mongoose');
var geojson = require('geojson');

var listingSchema = mongoose.Schema({
    id: Number,
    street: String,
    status: String,
    price: Number,
    bedrooms: Number,
    bathrooms: Number,
    sq_ft: Number,
    lat: Number,
    lng: Number
});

var extractRangeQuery = function(min, max) {
    var range = {};
    if (min !== undefined) {
        range['$gte'] = min;
    }
    if (max !== undefined) {
        range['$lte'] = max;
    }
    return range;
};

listingSchema.statics.getListings = function(query, callback) {
    var mongoQuery = {};
    if ('min_price' in query || 'max_price' in query) {
        mongoQuery['price'] = extractRangeQuery(query['min_price'], query['max_price']);
    }
    if ('min_bed' in query || 'max_bed' in query) {
        mongoQuery['bedrooms'] = extractRangeQuery(query['min_bed'], query['max_bed']);
    }
    if ('min_bath' in query || 'max_bath' in query) {
        mongoQuery['bathrooms'] = extractRangeQuery(query['min_bath'], query['max_bath']);
    }
    Listing.find(mongoQuery, '-_id').lean().exec(function(err, listings) {
        if (err) {
            callback(err);
            return console.error(err);
        }
        var json = geojson.parse(listings, {Point: ['lat', 'lng']});
        callback(json);
    });
};

var Listing = mongoose.model('listing', listingSchema);
module.exports = Listing;
