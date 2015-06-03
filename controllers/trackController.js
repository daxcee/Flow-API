require('../models/track')();
require('../models/artist')();

var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var config = require('config');

//max 4 connections in pool
var conn = mongoose.createConnection(config.get('db_uri'),{ server: { poolSize: 4 }});
//Track and Artist models are scoped to above specific connection object
var Track = conn.model('Track');
var Artist = conn.model('Artist');

module.exports = {
    getAllTracks: function (req, res) {
        Track.find({}, function (err, result) {
            if (err) {
                console.log(err);
                res.statusCode = 500;
                throw err;
            }

            if (result.length) {
                console.log('[getAllTracks]: ', result);
                res.statusCode = 200;
                res.setHeader("Content-Type", "application/json");
                res.end(JSON.stringify(result, null, 2));
            } else {
                console.log('[getAllTracks]: No tracks(s) found for: ' + req.params.id);
                res.statusCode = 200;
                res.setHeader("Content-Type", "application/json");
                res.end(JSON.stringify([], null, 2));
            }
        });
    },

    getTrackById: function (req, res) {
        Track.find({'_id': req.params.id}, function (err, result) {
            if (err) {
                console.log(err);
                res.statusCode = 500;
                throw err;
            }

            if (result.length) {
                console.log('[getTrackById]: ', result);
                res.statusCode = 200;
                res.setHeader("Content-Type", "application/json");
                res.end(JSON.stringify(result, null, 2));
            } else {
                console.log('[getTrackById]: Track: ' + req.params.id + ' not found.');
                res.statusCode = 200;
                res.setHeader("Content-Type", "application/json");
                res.end(JSON.stringify([], null, 2));
            }
        });
    },

    getTrackByArtistId: function (req, res) {
        Artist.findOne({'_id': req.params.id}, function (err, artist) {
            if (err) {
                console.log(err);
                res.statusCode = 500;
                throw err;
            }

            if (artist) {
                Track.find({'artists.artistName':  artist.artistName}, function (err, result){
                    if (err) {
                        console.log(err);
                        res.statusCode = 500;
                        throw err;
                    }

                    if (result.length) {
                        console.log('[getTrackByArtistId]: ', result);
                        res.statusCode = 200;
                        res.setHeader("Content-Type", "application/json");
                        res.end(JSON.stringify(result, null, 2));
                    } else {
                        console.log('[getTrackByArtistId]: No track(s) found for: ' + req.params.id);
                        res.statusCode = 200;
                        res.setHeader("Content-Type", "application/json");
                        res.end(JSON.stringify([], null, 2));
                    }
                });
            } else {
                console.log('[getTrackByArtistId]: Artist: ' + req.params.id + ' not found.');
                res.statusCode = 200;
                res.setHeader("Content-Type", "application/json");
                res.end(JSON.stringify([], null, 2));
            }
        });
    }
};