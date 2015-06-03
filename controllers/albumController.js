require('../models/album')();
require('../models/artist')();

var mongoose = require('mongoose');
var config = require('config');

//max 4 connections in pool
var conn = mongoose.createConnection(config.get('db_uri'),{ server: { poolSize: 4 }});
//Album model is scoped to above specific connection object
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
                console.log('[getAllAlbums]: ', result);
                res.statusCode = 200;
                res.setHeader("Content-Type", "application/json");
                res.end(JSON.stringify(result, null, 2));
            } else {
                console.log('[getAllAlbums]: No album(s) found for: ' + req.params.id);
                res.statusCode = 200;
                res.setHeader("Content-Type", "application/json");
            }

        });
    },

    getAlbumById: function (req, res) {
        Album.find({}, function (err, result) {
            Artist.findOne({'artistName': req.params.id}, function (err, artist) {
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
                            console.log('[getAlbumById]: ', result);
                            res.statusCode = 200;
                            res.setHeader("Content-Type", "application/json");
                            res.end(JSON.stringify(result, null, 2));
                        } else {
                            console.log('[getAlbumById]: No album(s) found for: ' + req.params.id);
                            res.statusCode = 200;
                            res.setHeader("Content-Type", "application/json");
                            res.end(JSON.stringify([], null, 2));
                        }
                    });
                } else {
                    console.log('[getAlbumById]: Artist: ' + req.params.id + ' not found.');
                    res.statusCode = 200;
                    res.setHeader("Content-Type", "application/json");
                    res.end(JSON.stringify([], null, 2));
                }
            });
        });
    },

    getAlbumByArtistId: function (req, res) {
        Album.find({}, function (err, result) {
            Artist.findOne({'artistName': req.params.id}, function (err, artist) {
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
                            console.log('[getAlbumByArtistId]: ', result);
                            res.statusCode = 200;
                            res.setHeader("Content-Type", "application/json");
                            res.end(JSON.stringify(result, null, 2));
                        } else {
                            console.log('[getAlbumByArtistId]: No album(s) found for: ' + req.params.id);
                            res.statusCode = 200;
                            res.setHeader("Content-Type", "application/json");
                            res.end(JSON.stringify([], null, 2));
                        }
                    });
                } else {
                    console.log('[getAlbumByArtistId]: Artist: ' + req.params.id + ' not found.');
                    res.statusCode = 200;
                    res.setHeader("Content-Type", "application/json");
                    res.end(JSON.stringify([], null, 2));
                }
            });

        });
    }
};