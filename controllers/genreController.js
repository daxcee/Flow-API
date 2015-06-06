require('../models/genre')();

var mongoose = require('mongoose');
var config = require('config');
var excep = require('../utils/exception');
var pretty = require('../utils/pretty');

//max 4 connections in pool
var conn = mongoose.createConnection(config.get('db_uri'),{ server: { poolSize: 4 }});
//Genre model is scoped to above specific connection object
var Genre = conn.model('Genre');

module.exports = {
    getAllGenres: function (req, res) {
        Genre.find({}, function (err, result) {
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

    getGenreById: function (req, res) {
        Genre.find({'genreName': req.params.id}, function (err, result) {
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
    }
};