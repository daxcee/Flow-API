var paramCollector = require('../utils/paramHarvester.js');
var query = require('../queriers/videosQuerier.js');

module.exports = {
    getAllVideos: function (req, res) {
        query.videos(res, paramCollector.process(req));
    },

    getVideoById: function (req, res) {
        query.videos(res, paramCollector.process(req, "_id"));
    },

    getVideoByArtistId: function (req, res) {
        query.videosOfArtists(res, paramCollector.process(req, "_id"));
    }
};