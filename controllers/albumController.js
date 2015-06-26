var query = require('../queriers/albumsQuerier.js');
var paramCollector = require('../utils/paramHarvester.js');

module.exports = {

    getAllAlbums: function (req, res) {
        query.albums(res, paramCollector.process(req));
    },

    getAlbumById: function (req, res) {
        query.albums(res, paramCollector.process(req, "_id"));
    },

    getAlbumByArtistId: function (req, res) {
        query.albumsByArtist(res, paramCollector.process(req, "_id"));
    }
};