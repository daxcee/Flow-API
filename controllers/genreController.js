require('../models/genre')();
require('../models/token')();

var mongoose = require('mongoose');
var config = require('config');
var pretty = require('../utils/pretty');
var resultResponse = require('../utils/resultResponse.js');
var query = require('../queriers/genresQuerier.js');

//max 4 connections in pool
var conn = mongoose.createConnection(config.get('db_uri'),{ server: { poolSize: 4 }});
//Genre model is scoped to above specific connection object
var Genre = conn.model('Genre');
var Token = conn.model('Token');

module.exports = {
    getAllGenres: function (req, res) {
        var apikey = req.param('apikey');
        Token.findOne({'value': apikey}, function (err, token) {
            if (err) {
                resultResponse.error(err);
                return;
            }
            if (token) {
                var params = {
                    limit:req.param('limit'),
                    offset:req.param('offset')
                };

                query.genres(res, params);
            } else {
                resultResponse.unauthorized(res);
            }
        });
    },

    getGenreById: function (req, res) {
        var apikey = req.param('apikey');
        Token.findOne({'value': apikey}, function (err, token) {
            if (err) {
               resultResponse.error(err);
                return;
            }
            if (token) {
                var searchObject = {};
                searchObject.genreName = req.params.id;

                var params = {
                    limit:req.param('limit'),
                    offset:req.param('offset'),
                    searchTerm:searchObject
                };
                query.genres(res, params);

            } else {
                resultResponse.unauthorized(res);
            }
        });
    }
};