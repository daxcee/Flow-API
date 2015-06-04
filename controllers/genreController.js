require('../models/genre')();

var mongoose = require('mongoose');
var config = require('config');

//max 4 connections in pool
var conn = mongoose.createConnection(config.get('db_uri'),{ server: { poolSize: 4 }});
//Genre model is scoped to above specific connection object
var Genre = conn.model('Genre');

module.exports = {
    getAllGenres: function (req, res) {
        Genre.find({}, function (err, result) {
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

    getGenreById: function (req, res) {
        Genre.find({'genreName': req.params.id}, function (err, result) {
            if (err) {
                console.log(err);
                res.statusCode = 500;
                throw err;
            }

            if (result.length) {
                console.log('[getGenreById]: ', result);
                res.statusCode = 200;
                res.end(JSON.stringify(result, null, 2));
            } else {
                res.statusCode = 200;
                res.setHeader("Content-Type", "application/json");
                res.end(JSON.stringify([], null, 2));
            }
        });
    }
};