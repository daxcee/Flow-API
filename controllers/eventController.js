require('../models/event')();
require('../models/artist')();

var mongoose = require('mongoose');
var config = require('config');
var excep = require('../utils/exception');
var pretty = require('../utils/pretty');

//max 4 connections in pool
var conn = mongoose.createConnection(config.get('db_uri'),{ server: { poolSize: 4 }});
//Album and Artist models are scoped to above specific connection object
var Event = conn.model('Event');
var Artist = conn.model('Artist');

module.exports = {
    getAllEvents: function (req, res) {
        Event.find({}, function (err, result) {
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

    getEventById: function (req, res) {
        Event.find({'_id': req.params.id}, function (err, result) {
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

    getEventByDate: function (req, res) {
        Event.find({}, function (err, result) {});
    },

    getEventByArtist: function (req, res) {
        Event.find({}, function (err, result) {});
    },

    getEventByGenre: function (req, res) {
        Event.find({}, function (err, result) {
        });
    }
};