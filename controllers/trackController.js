require('../models/track')();
require('../models/artist')();
require('../models/token')();

var mongoose = require('mongoose');
var config = require('config');
var excep = require('../utils/exception');
var pretty = require('../utils/pretty');
var serverResponse = require('../utils/serverResponse.js');
var query = require('../queriers/tracksQuerier.js');

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
                serverResponse.error(err);
                return;
            }
            if (token) {
                var params = {
                    limit:req.param('limit'),
                    offset:req.param('offset')
                };

                query.tracks(res, params);
            } else {
                serverResponse.unauthorized(res);
            }
        });
    },

    getTrackById: function (req, res) {
        var apikey = req.param('apikey');
        Token.findOne({'value': apikey}, function (err, token) {
            if (err) {
                serverResponse.error(err);
                return;
            }
            if (token) {
                var searchObject = {};
                searchObject._id = req.params.id;

                var params = {
                    limit:req.param('limit'),
                    offset:req.param('offset'),
                    searchTerm:searchObject
                };
                query.tracks(res, params);
            } else {
                serverResponse.unauthorized(res);
            }
        });
    },

    getTrackByArtistId: function (req, res) {
        var apikey = req.param('apikey');
        Token.findOne({'value': apikey}, function (err, token) {
            if (err) {
                serverResponse.error(err);
                return;
            }
            if (token) {
                var searchObject = {};
                searchObject._id = req.params.id;

                var params = {
                    limit:req.param('limit'),
                    offset:req.param('offset'),
                    searchTerm:searchObject
                };
                query.tracksByArtist(res, params);

            } else {
                serverResponse.unauthorized(res);
            }
        });
    }
};