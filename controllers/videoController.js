require('../models/video')();
require('../models/artist')();
require('../models/token')();

var mongoose = require('mongoose');
var config = require('config');
var pretty = require('../utils/pretty');

//max 4 connections in pool
var conn = mongoose.createConnection(config.get('db_uri'),{ server: { poolSize: 4 }});
//Track and Artist models are scoped to above specific connection object
var Video = conn.model('Video');
var Artist = conn.model('Artist');
var Token = conn.model('Token');
var resultResponse = require('../utils/resultResponse.js');
var query = require('../queriers/videosQuerier.js');

module.exports = {
    getAllVideos: function (req, res) {
        var apikey = req.param('apikey');
        Token.findOne({'value': apikey}, function (err, token) {
            if (err) {
                resultResponse.error(res,err);
                return;
            }
            if (token) {
                var params = {
                    limit:req.param('limit'),
                    offset:req.param('offset')
                };

                query.videos(res, params);
            } else {
                resultResponse.unauthorized(res);
            }
        });
    },

    getVideoById: function (req, res) {
        var apikey = req.param('apikey');
        Token.findOne({'value': apikey}, function (err, token) {
            if (err) {
                resultResponse.error(res,err);
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
                query.videos(res, params);
            } else {
                resultResponse.unauthorized(res);
            }
        });
    },

    getVideoByArtistId: function (req, res) {
        var apikey = req.param('apikey');
        Token.findOne({'value': apikey}, function (err, token) {
            if (err) {
                resultResponse.error(res,err);
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

                query.videosOfArtists(res, params);
            } else {
                resultResponse.unauthorized(res);
            }
        });
    }
};