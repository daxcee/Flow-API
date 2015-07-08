
var query = require('../queriers/eventsQuerier.js');
var paramCollector = require('../utils/paramHarvester.js');

module.exports = {
    getAllEvents: function (req, res) {
        query.events(res, paramCollector.process(req));
    },
    getEventById: function (req, res) {
        query.events(res, paramCollector.process(req, "_id"));
    },
    getEventByDate: function (req, res) {
       query.events(res, paramCollector.process(req, "date"));
    },
    getEventByCity: function (req, res) {
       query.events(res, paramCollector.process(req, "city"));
    },
    getEventByArtist: function (req, res) {
        query.eventsByArtist(res, paramCollector.process(req, "_id"));
    },
    getEventByGenre: function (req, res) {
        query.events(res, paramCollector.process(req, "genre"));
    }
};