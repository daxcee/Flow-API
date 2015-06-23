
require('../models/token')();

var mongoose = require('mongoose');
var config = require('config');
var excep = require('../utils/exception');
var pretty = require('../utils/pretty');
var serverResponse = require('../utils/serverResponse.js');
var query = require('../queriers/albumsQuerier.js');

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
                serverResponse.error(res, err);
                return;
            }
            if (token) {
                var params = {
                    limit:req.param('limit'),
                    offset:req.param('offset')
                };

                query.albums(res, params);
            } else {
                serverResponse.unauthorized(res);
            }
        });
    },

    getAlbumById: function (req, res) {
        var apikey = req.param('apikey');
        Token.findOne({'value': apikey}, function (err, token) {
            if (err) {
                serverResponse.error(res, err);
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

                query.albums(res, params);
            } else {
                serverResponse.unauthorized(res);
            }
        });
    },

    getAlbumByArtistId: function (req, res) {
        var apikey = req.param('apikey');
        Token.findOne({'value': apikey}, function (err, token) {
            if (err) {
                serverResponse.error(res, err);
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

                query.albumsByArtist(res,params)
            } else {
              serverResponse.unauthorized(res)
            }
        });
    }
};