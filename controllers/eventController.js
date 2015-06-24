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
                var params = {
                    limit:req.param('limit'),
                    offset:req.param('offset'),
                    sortKey:req.param('sort'),
                    sortOrder:req.param('order'),
                    searchTerm:req.param('id')
                };

                query.events(res, paramCollector.process(params));
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
                var params = {
                    limit:req.param('limit'),
                    offset:req.param('offset'),
                    sortKey:req.param('sort'),
                    sortOrder:req.param('order'),
                    searchKey:"_id",
                    searchTerm:req.param('id')
                };

                query.events(res, paramCollector.process(params));
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
                var params = {
                    limit:req.param('limit'),
                    offset:req.param('offset'),
                    sortKey:req.param('sort'),
                    sortOrder:req.param('order'),
                    searchKey:"date",
                    searchTerm:req.param('id')
                };

                query.events(res, paramCollector.process(params));
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
                var params = {
                    limit:req.param('limit'),
                    offset:req.param('offset'),
                    sortKey:req.param('sort'),
                    sortOrder:req.param('order'),
                    searchKey:"city",
                    searchTerm:req.param('id')
                };
                console.log("pre: %s", JSON.stringify(params));

                query.events(res, paramCollector.process(params));
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
                var params = {
                    limit:req.param('limit'),
                    offset:req.param('offset'),
                    sortKey:req.param('sort'),
                    sortOrder:req.param('order'),
                    searchKey:"artist",
                    searchTerm:req.param('id')
                };

                query.events(res, paramCollector.process(params));
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
                var params = {
                    limit:req.param('limit'),
                    offset:req.param('offset'),
                    sortKey:req.param('sort'),
                    sortOrder:req.param('order'),
                    searchKey:"genre",
                    searchTerm:req.param('id')
                };

                query.events(res, paramCollector.process(params));
            } else {
                serverResponse.unauthorized(res);
            }
        });
    }
};