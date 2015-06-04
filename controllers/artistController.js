require('../models/artist')();

var mongoose = require('mongoose');
var config = require('config');

//max 4 connections in pool
var conn = mongoose.createConnection(config.get('db_uri'),{ server: { poolSize: 4 }});
//Artist model is scoped to above specific connection object
var Artist = conn.model('Artist');

module.exports = {
    getAllArtists: function (req, res) {
        Artist.find({}, function (err, result) {
            if (err) {
                console.log(err);
                res.statusCode = 500;
                throw err;
            }

            if (result.length) {
                res.statusCode = 200;
                res.setHeader("Content-Type", "application/json");
                res.end(JSON.stringify(result, null, 2));
            } else {
                res.statusCode = 200;
                res.setHeader("Content-Type", "application/json");
                res.end(JSON.stringify([], null, 2));
            }
        });
    },

    getArtistById:function (req, res) {
        Artist.find({'_id':  req.params.id}, function (err, result) {
            if (err) {
                console.log(err);
                res.statusCode = 500;
                throw err;
            }

            if (result.length) {
                res.statusCode = 200;
                res.setHeader("Content-Type", "application/json");
                res.end(JSON.stringify(result, null, 2));
            } else {
                res.statusCode = 200;
                res.setHeader("Content-Type", "application/json");
                res.end(JSON.stringify([], null, 2));
            }
        });
    }
};