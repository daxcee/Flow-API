var query = require('../queriers/newsQuerier.js');
var paramCollector = require('../utils/paramHarvester.js');

module.exports = {
    getAllNews: function (req, res) {
        query.news(res, paramCollector.process(req));
    },

    getNewsById: function (req, res) {
        query.news(res, paramCollector.process(req, "_id"));
    },

    getNewsByDate: function (req, res) {
        query.news(res, paramCollector.process(req, "date"));
    }
};