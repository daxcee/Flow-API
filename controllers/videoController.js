require('../models/video')();
require('../models/artist')();

var mongoose = require('mongoose');
var config = require('config');
var excep = require('../utils/exception');
var pretty = require('../utils/pretty');

//max 4 connections in pool
var conn = mongoose.createConnection(config.get('db_uri'),{ server: { poolSize: 4 }});
//Track and Artist models are scoped to above specific connection object
var Video = conn.model('Video');
var Artist = conn.model('Artist');

module.exports = {
    getAllVideos: function (req, res) {
        Video.find({}, function (err, result) {
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
            } else {
                res.statusCode = 200;
                res.end(pretty.print([]));
            }
        });
    },
    getVideoById: function (req, res) {
        Video.find({'_id': req.params.id}, function (err, result) {
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
            } else {
                res.statusCode = 200;
                res.end(pretty.print([]));
            }
        });
    },

    getVideoByArtistId: function (req, res) {
        Artist.findOne({'_id': req.params.id}, function (err, artist) {
            res.setHeader("Content-Type", "application/json");

            if (err) {
                console.log(err);
                res.statusCode = 500;
                res.end(pretty.print(excep.msg(500, 'Server Error', err)));
            }
            if (artist) {
                Video.find({'artists.artistName':  artist.artistName}, function (err, result){
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
                        res.end(pretty.print([]));
                    }
                });
            } else {
                res.statusCode = 200;
                res.end(pretty.print([]));
            }
        });
    }
};