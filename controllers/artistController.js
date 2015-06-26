var query = require('../queriers/artistsQuerier.js');
var paramCollector = require('../utils/paramHarvester.js');

module.exports = {
    getAllArtists: function (req, res) {
        query.artists(res, paramCollector.process(req));
    },

    getArtistById:function (req, res) {
        query.artists(res, paramCollector.process(req, "_id"));
    }
};