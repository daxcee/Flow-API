require('../models/album')();
require('../models/artist')();

var mongoose = require('mongoose');
var config = require('config');
var excep = require('../utils/exception');
var pretty = require('../utils/pretty');

//max 4 connections in pool
var conn = mongoose.createConnection(config.get('db_uri'),{ server: { poolSize: 4 }});
//Album and Artist models are scoped to above specific connection object
var Album = conn.model('Album');
var Artist = conn.model('Artist');

module.exports = {
    getAllAlbums: function (req, res) {
        Album.find({}, function (err, result) {
            res.setHeader("Content-Type", "application/json");

            if (err) {
                console.log(err);
                res.statusCode = 500;
                res.end(pretty.print(excep.msg(500, 'Server Error', err)));
                return;
            }
            if (result.length) {
                res.statusCode = 200;
                res.end(pretty.print(result));
            }
        });
    },

    getAlbumById: function (req, res) {
        Album.find({'_id': req.params.id}, function (err, result) {
            res.setHeader("Content-Type", "application/json");

            if (err) {
                console.log(err);
                res.statusCode = 500;
                res.end(pretty.print(excep.msg(500, 'Server Error', err)));
                return;
            }
            if (result.length) {
                res.statusCode = 200;
                res.end(pretty.print(result));
            }
        });
    },

    getAlbumByArtistId: function (req, res) {
        Album.find({}, function (err, result) {
            Artist.findOne({'_id': req.params.id}, function (err, artist) {
                res.setHeader("Content-Type", "application/json");

                if (err) {
                    console.log(err);
                    res.statusCode = 500;
                    res.end(pretty.print(excep.msg(500, 'Server Error', err)));
                    return;
                }
                if (artist) {
                    Album.find({'artists.artistName':  artist.artistName}, function (err, result){
                        if (err) {
                            console.log(err);
                            res.statusCode = 500;
                            res.end(pretty.print(excep.msg(500, 'Server Error', err)));
                            return;
                        }
                        if (result.length) {
                            res.statusCode = 200;
                            res.end(pretty.print(result));
                        } else {
                            res.statusCode = 200;
                            res.end(pretty.print(result));
                        }
                    });
                } else {
                    res.statusCode = 200;
                    res.end(pretty.print([]));
                }
            });

        });
    }
};