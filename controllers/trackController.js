var query = require('../queriers/tracksQuerier.js');
var paramCollector = require('../utils/paramHarvester.js');

module.exports = {
    getAllTracks: function (req, res) {
        query.tracks(res, paramCollector.process(req));
    },

    getTrackById: function (req, res) {
        query.tracks(res, paramCollector.process(req, "_id"));
    },

    getTrackByArtistId: function (req, res) {
        query.tracksByArtist(res, paramCollector.process(req, "_id"));
    }
};