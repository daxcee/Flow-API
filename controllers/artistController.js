require('../models/artist')();
require('../models/token')();

var mongoose = require('mongoose');
var config = require('config');
var pretty = require('../utils/pretty');
var resultResponse = require('../utils/resultResponse.js');
var query = require('../queriers/artistsQuerier.js');
var paramCollector = require('../utils/paramHarvester.js');

//max 4 connections in pool
var conn = mongoose.createConnection(config.get('db_uri'),{ server: { poolSize: 4 }});
//Artist model is scoped to above specific connection object
var Artist = conn.model('Artist');
var Token = conn.model('Token');

module.exports = {
    getAllArtists: function (req, res) {
        var apikey = req.param('apikey');
        Token.findOne({'value': apikey}, function (err, token) {
            if (err) {
                resultResponse.error(res, err);
                return;
            }
            if (token) {
                query.artists(res, paramCollector.process(req));
            } else {
               resultResponse.unauthorized(res)
            }
        });
    },

    getArtistById:function (req, res) {
        var apikey = req.param('apikey');
        Token.findOne({'value': apikey}, function (err, token) {
            if (err) {
                resultResponse.error(res, err);
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

                query.artists(res, paramCollector.process(req, "_id"));

            } else {
                resultResponse.unauthorized(res)
            }
        });
    }
};