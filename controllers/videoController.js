require('../models/video')();
require('../models/artist')();
require('../models/token')();

var mongoose = require('mongoose');
var config = require('config');
var pretty = require('../utils/pretty');
var paramCollector = require('../utils/paramHarvester.js');

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
                query.videos(res, paramCollector.process(req));
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
                query.videos(res, paramCollector.process(req, "_id"));
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
                query.videosOfArtists(res, paramCollector.process(req, "_id"));
            } else {
                resultResponse.unauthorized(res);
            }
        });
    }
};