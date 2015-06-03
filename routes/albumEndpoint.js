require('../models/album')();
require('../models/artist')();

var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var config = require('config');

//max 4 connections in pool
var conn = mongoose.createConnection(config.get('db_uri'),{ server: { poolSize: 4 }});
//Album model is scoped to above specific connection object
var Album = conn.model('Album');
var Artist = conn.model('Artist');

var base = '/api/v1';
var path = base + '/albums';

//Retrieve all albums
router.get(path, function(req, res) {
    Album.find({}, function (err, result) {
        if (err) {
            console.log(err);
            res.statusCode = 500;
            throw err;
        }

        if (result.length) {
            console.log('Result:', result);
            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify(result, null, 2));
        } else {
            console.log('No album(s) found for: ' + req.params.id);
            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify([], null, 2));
        }
    });
});
//Get album(s) of an artist
router.get(path + '/:id', function(req, res) {
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
                    console.log('Result:', result);
                    res.statusCode = 200;
                    res.setHeader("Content-Type", "application/json");
                    res.end(JSON.stringify(result, null, 2));
                } else {
                    console.log('No album(s) found for: ' + req.params.id);
                    res.statusCode = 200;
                    res.setHeader("Content-Type", "application/json");
                    res.end(JSON.stringify([], null, 2));
                }
            });
        } else {
            console.log('Artist: ' + req.params.id + ' not found.');
            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify([], null, 2));
        }
    });
});

module.exports = router;