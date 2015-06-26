require ('mongoose-pagination');

var mongoose = require('mongoose');
var config = require('config');
var serverResponse = require('../utils/resultResponse.js');
var query = require('../queriers/eventsQuerier.js');
var paramCollector = require('../utils/paramHarvester.js');

//max 4 connections in pool
var conn = mongoose.createConnection(config.get('db_uri'),{ server: { poolSize: 4 }});
//Album and Artist models are scoped to above specific connection object
var Token = conn.model('Token');

module.exports = {
    getAllEvents: function (req, res) {
        Token.findOne({'value': req.param('apikey')}, function (err, token) {
            if (err) {
                serverResponse.error(res, err);
                return;
            }
            if (token) {
                query.events(res, paramCollector.process(req));
            } else {
                serverResponse.unauthorized(res);
            }
        });
    },

    getEventById: function (req, res) {
        Token.findOne({'value': req.param('apikey')}, function (err, token) {
            if (err) {
                serverResponse.error(res, err);
                return;
            }
            if (token) {
                query.events(res, paramCollector.process(req, "_id"));
            } else {
                serverResponse.unauthorized(res);
            }
        });
    },

    getEventByDate: function (req, res) {
        Token.findOne({'value': req.param('apikey')}, function (err, token) {
            if (err) {
                serverResponse.error(res, err);
                return;
            }
            if (token) {
                query.events(res, paramCollector.process(req, "date"));
            } else {
                serverResponse.unauthorized(res);
            }
        });
    },

    getEventByCity: function (req, res) {
        Token.findOne({'value': req.param('apikey')}, function (err, token) {
            if (err) {
                serverResponse.error(res, err);
                return;
            }
            if (token) {
                query.events(res, paramCollector.process(req, "city"));
            } else {
                serverResponse.unauthorized(res);
            }
        });
    },

    getEventByArtist: function (req, res) {
        var apikey = req.param('apikey');
        Token.findOne({'value': apikey}, function (err, token) {
            if (err) {
                serverResponse.error(res, err);
                return;
            }
            if (token) {
                query.events(res, paramCollector.process(req, "artist"));
            } else {
                serverResponse.unauthorized(res);
            }
        });
    },

    getEventByGenre: function (req, res) {
        Token.findOne({'value': req.param('apikey')}, function (err, token) {
            if (err) {
                serverResponse.error(res, err);
                return;
            }
            if (token) {
                query.events(res, paramCollector.process(req, "genre"));
            } else {
                serverResponse.unauthorized(res);
            }
        });
    }
};