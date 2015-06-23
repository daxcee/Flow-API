require('../models/event')();
require('../models/artist')();
require('../models/token')();
require ('mongoose-pagination');

var mongoose = require('mongoose');
var config = require('config');
var excep = require('../utils/exception');
var pretty = require('../utils/pretty');

//max 4 connections in pool
var conn = mongoose.createConnection(config.get('db_uri'),{ server: { poolSize: 4 }});
//Album and Artist models are scoped to above specific connection object
var Event = conn.model('Event');
var Artist = conn.model('Artist');
var Token = conn.model('Token');

module.exports = {
    getAllEvents: function (req, res) {
        Token.findOne({'value': req.param('apikey')}, function (err, token) {
            if (err) {
                res.statusCode = 500;
                res.end(pretty.print(excep.msg(500, 'Server Error', err)));
                return;
            }
            if (token) {
                var params = {
                    limit:req.param('limit'),
                    offset:req.param('offset')
                };

                queryEvents(res, params);
            } else {
                res.statusCode = 401;
                res.send('401 Unauthorized');
            }
        });
    },

    getEventById: function (req, res) {
        Token.findOne({'value': req.param('apikey')}, function (err, token) {
            if (err) {
                res.statusCode = 500;
                res.end(pretty.print(excep.msg(500, 'Server Error', err)));
                return;
            }
            if (token) {
                var searchObject = {};
                searchObject.pid = req.params.id;

                var params = {
                    limit:req.param('limit'),
                    offset:req.param('offset'),
                    searchTerm:searchObject
                };

                queryEvents(res, params);
            } else {
                res.statusCode = 401;
                res.send('401 Unauthorized');
            }
        });
    },

    getEventByDate: function (req, res) {
        Token.findOne({'value': req.param('apikey')}, function (err, token) {
            if (err) {
                res.statusCode = 500;
                res.end(pretty.print(excep.msg(500, 'Server Error', err)));
                return;
            }
            if (token) {
                var searchObject = {};
                searchObject.date = req.params.id;

                var params = {
                    limit:req.param('limit'),
                    offset:req.param('offset'),
                    searchTerm:searchObject
                };

                queryEvents(res, params);
            } else {
                res.statusCode = 401;
                res.send('401 Unauthorized');
            }
        });
    },

    getEventByCity: function (req, res) {
        Token.findOne({'value': req.param('apikey')}, function (err, token) {
            if (err) {
                res.statusCode = 500;
                res.end(pretty.print(excep.msg(500, 'Server Error', err)));
                return;
            }
            if (token) {
                var searchObject = {};
                searchObject.city = req.params.id;

                var params = {
                    limit:req.param('limit'),
                    offset:req.param('offset'),
                    searchTerm:searchObject
                };

                queryEvents(res, params);
            } else {
                res.statusCode = 401;
                res.send('401 Unauthorized');
            }
        });
    },

    getEventByArtist: function (req, res) {
        var apikey = req.param('apikey');
        Token.findOne({'value': apikey}, function (err, token) {
            if (err) {
                res.statusCode = 500;
                res.end(pretty.print(excep.msg(500, 'Server Error', err)));
                return;
            }
            if (token) {
                var searchObject = {};
                searchObject.artist = req.params.id;

                var params = {
                    limit:req.param('limit'),
                    offset:req.param('offset'),
                    searchTerm:searchObject
                };

                queryEvents(res, params);
            } else {
                res.statusCode = 401;
                res.send('401 Unauthorized');
            }
        });
    },

    getEventByGenre: function (req, res) {
        Token.findOne({'value': req.param('apikey')}, function (err, token) {
            if (err) {
                res.statusCode = 500;
                res.end(pretty.print(excep.msg(500, 'Server Error', err)));
                return;
            }
            if (token) {
                var searchObject = {};
                searchObject.genre = req.params.id;

                var params = {
                    limit:req.param('limit'),
                    offset:req.param('offset'),
                    searchTerm:searchObject
                };

                queryEvents(res, params);
            } else {
                res.statusCode = 401;
                res.send('401 Unauthorized');
            }
        });
    }
};

function queryEvents(res, params) {

    var limit = params.limit;
    var offset = params.offset;
    var searchTerm = params.searchTerm;

    if(searchTerm) {
        console.log("searchQuery: %s", pretty.print(searchTerm));
    }

    Event.find(searchTerm).paginate(offset, limit, function(err, docs, total) {
        var first, last, prev, next,result;
        var pageCount = parseInt(limit);
        var totalPages = Math.ceil(parseInt(total / pageCount));

        if(offset < 1 ) {
            result = {
                error: "offset of " + offset + " is out of range, must start with 1"
            };

            res.statusCode = 200;
            res.end(pretty.print(result));

            return;
        }

        if(pageCount > 1){
            if(offset > 1) {
                var prevPageIndex = parseInt(offset) - 1;
                prev = config.get("app_url") + "/api/v1/events?offset=" + prevPageIndex + "&limit=" + limit;
            }

            if(offset < totalPages) {
                var nextPageIndex = parseInt(offset) + 1;
                next =  config.get("app_url") + "/api/v1/events?offset=" + nextPageIndex + "&limit=" + limit;
            }

            result = {
                totalEvents: total,
                currentPage: offset,
                pagination: {
                    first: first,
                    last: last,
                    prev: prev,
                    next: next
                },
                events:docs
            };
            res.statusCode = 200;
            res.end(pretty.print(result));
        }
    });
}