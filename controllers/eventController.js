require ('mongoose-pagination');

var mongoose = require('mongoose');
var config = require('config');
var serverResponse = require('../utils/serverResponse.js');
var query = require('../queriers/eventsQuerier.js');

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
                var params = {
                    limit:req.param('limit'),
                    offset:req.param('offset')
                };

                query.events(res, params);
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
                var searchObject = {};
                searchObject.pid = req.params.id;

                var params = {
                    limit:req.param('limit'),
                    offset:req.param('offset'),
                    searchTerm:searchObject
                };

                queryEvents(res, params);
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
                var searchObject = {};
                searchObject.date = req.params.id;

                var params = {
                    limit:req.param('limit'),
                    offset:req.param('offset'),
                    searchTerm:searchObject
                };

                queryEvents(res, params);
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
                var searchObject = {};
                searchObject.city = req.params.id;

                var params = {
                    limit:req.param('limit'),
                    offset:req.param('offset'),
                    searchTerm:searchObject
                };

                queryEvents(res, params);
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
                var searchObject = {};
                searchObject.artist = req.params.id;

                var params = {
                    limit:req.param('limit'),
                    offset:req.param('offset'),
                    searchTerm:searchObject
                };

                queryEvents(res, params);
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
                var searchObject = {};
                searchObject.genre = req.params.id;

                var params = {
                    limit:req.param('limit'),
                    offset:req.param('offset'),
                    searchTerm:searchObject
                };

                queryEvents(res, params);
            } else {
                serverResponse.unauthorized(res);
            }
        });
    }
};