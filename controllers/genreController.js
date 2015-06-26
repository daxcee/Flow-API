var query = require('../queriers/genresQuerier.js');
var paramCollector = require('../utils/paramHarvester.js');

module.exports = {
    getAllGenres: function (req, res) {
        query.genres(res, paramCollector.process(req));
    },

    getGenreById: function (req, res) {
        query.genres(res, paramCollector.process(req,"genreName"));
    }
};