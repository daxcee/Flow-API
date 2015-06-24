require('../models/track')();
require('../models/artist')();
require('../models/token')();

var mongoose = require('mongoose');
var config = require('config');
var pretty = require('../utils/pretty');
var resultResponse = require('../utils/resultResponse.js');
var query = require('../queriers/tracksQuerier.js');
var paramCollector = require('../utils/paramHarvester.js');

//max 4 connections in pool
var conn = mongoose.createConnection(config.get('db_uri'),{ server: { poolSize: 4 }});
//Track and Artist models are scoped to above specific connection object
var Track = conn.model('Track');
var Artist = conn.model('Artist');
var Token = conn.model('Token');

module.exports = {
    getAllTracks: function (req, res) {
        var apikey = req.param('apikey');
        Token.findOne({'value': apikey}, function (err, token) {
            if (err) {
                resultResponse.error(err);
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

                query.tracks(res, paramCollector.process(params));
            } else {
                resultResponse.unauthorized(res);
            }
        });
    },

    getTrackById: function (req, res) {
        var apikey = req.param('apikey');
        Token.findOne({'value': apikey}, function (err, token) {
            if (err) {
                resultResponse.error(err);
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

                query.tracks(res, paramCollector.process(params));
            } else {
                resultResponse.unauthorized(res);
            }
        });
    },

    getTrackByArtistId: function (req, res) {
        var apikey = req.param('apikey');
        Token.findOne({'value': apikey}, function (err, token) {
            if (err) {
                resultResponse.error(err);
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

                query.tracksByArtist(res, paramCollector.process(params));
            } else {
                resultResponse.unauthorized(res);
            }
        });
    }
};