require('../models/album')();

var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var config = require('config');

//max 4 connections in pool
var conn = mongoose.createConnection(config.get('db_uri'),{ server: { poolSize: 4 }});
//Album model is scoped to above specific connection object
var Album = conn.model('album');

var base = '/api/v1';
var path = base + '/albums';

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
            console.log('No document(s) found with defined criteria.');
            res.statusCode = 404;
            res.setHeader("Content-Type", "text/html");
            res.end('No document(s) found with defined criteria.');
        }
    });
});

module.exports = router;