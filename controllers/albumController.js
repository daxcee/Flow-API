
require('../models/token')();

var mongoose = require('mongoose');
var config = require('config');
var excep = require('../utils/exception');
var pretty = require('../utils/pretty');
var resultResponse = require('../utils/resultResponse.js');
var query = require('../queriers/albumsQuerier.js');
var paramCollector = require('../utils/paramHarvester.js');

//max 4 connections in pool
var conn = mongoose.createConnection(config.get('db_uri'),{ server: { poolSize: 4 }});
//Album and Artist models are scoped to above specific connection object
var Album = conn.model('Album');
var Artist = conn.model('Artist');
var Token = conn.model('Token');

module.exports = {

    getAllAlbums: function (req, res) {
        var apikey = req.param('apikey');
        Token.findOne({'value': apikey}, function (err, token) {
            if (err) {
                resultResponse.error(res, err);
                return;
            }
            if (token) {
                query.albums(res, paramCollector.process(req));
            } else {
                resultResponse.unauthorized(res);
            }
        });
    },

    getAlbumById: function (req, res) {
        var apikey = req.param('apikey');
        Token.findOne({'value': apikey}, function (err, token) {
            if (err) {
                resultResponse.error(res, err);
                return;
            }
            if (token) {
                query.albums(res, paramCollector.process(req, "_id"));
            } else {
                resultResponse.unauthorized(res);
            }
        });
    },

    getAlbumByArtistId: function (req, res) {
        var apikey = req.param('apikey');
        Token.findOne({'value': apikey}, function (err, token) {
            if (err) {
                resultResponse.error(res, err);
                return;
            }
            if (token) {
                query.albumsByArtist(res, paramCollector.process(req, "_id"));
            } else {
              resultResponse.unauthorized(res)
            }
        });
    }
};