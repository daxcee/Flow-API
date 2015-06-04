require('../models/album')();
require('../models/artist')();

var mongoose = require('mongoose');
var config = require('config');

//max 4 connections in pool
var conn = mongoose.createConnection(config.get('db_uri'),{ server: { poolSize: 4 }});
//Album and Artist models are scoped to above specific connection object
var Album = conn.model('Album');
var Artist = conn.model('Artist');

module.exports = {
    getAllAlbums: function (req, res) {
        Album.find({}, function (err, result) {
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
            }
        });
    },

    getAlbumById: function (req, res) {
        Album.find({'_id': req.params.id}, function (err, result) {
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

    getAlbumByArtistId: function (req, res) {
        Album.find({}, function (err, result) {
            Artist.findOne({'_id': req.params.id}, function (err, artist) {
                if (err) {
                    console.log(err);
                    res.statusCode = 500;
                    throw err;
                }

                if (artist) {
                    Album.find({'artists.artistName':  artist.artistName}, function (err, result){
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
                } else {
                    res.statusCode = 200;
                    res.setHeader("Content-Type", "application/json");
                    res.end(JSON.stringify([], null, 2));
                }
            });

        });
    }
};