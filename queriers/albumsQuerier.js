require('../models/album')();
require('../models/artist')();

var mongoose = require('mongoose');
var pretty = require('../utils/pretty');
var config = require('config');
var serverResponse = require('../utils/resultResponse.js');
var pagination = require('../utils/pagination.js');

//max 4 connections in pool
var conn = mongoose.createConnection(config.get('db_uri'),{ server: { poolSize: 4 }});
//Album and Artist models are scoped to above specific connection object
var Album = conn.model('Album');
var Artist = conn.model('Artist');

module.exports = {

    albums:function queryAlbums(res, params) {
        var range = pagination.range(params);
        var searchTerm = params.searchTerm;
        console.log("searchQuery: %s", pretty.print(searchTerm));

        Album.find(searchTerm).paginate(range.offset, range.limit, function(err, docs, total) {
            params.total = total;
            var paging = pagination.paging(res,params);
            if(err){
                serverResponse.error(res,err);
                return
            }
            if(paging.offset < 1 ) {
                serverResponse.invalid_range(res);
                return;
            }

            var result = {
                totalEvents: total,
                totalPages: paging.totalPages,
                currentPage: paging.offset,
                pagination: {
                    prev: paging.prev,
                    next: paging.next
                },
                result:docs
            };

            serverResponse.result(res,result);
        });
    },

    albumsByArtist: function(res, params){
        var range = pagination.range(params);
        var searchTerm = params.searchTerm;
        console.log("searchQuery: %s", pretty.print(searchTerm));

        Artist.findOne(searchTerm, function (err, artist) {
            var result = {};
            if (err) {
                serverResponse.error(res,err);
                return;
            }
            if (artist) {
                Album.find({'artists.artistName':  artist.artistName}).paginate(range.offset, range.limit, function(err, docs, total) {
                    params.total = total;
                    var paging = pagination.paging(res,params);
                    if (err) {
                        serverResponse.error(res,err);
                        return;
                    }
                    if(paging.offset < 1 ) {
                        serverResponse.invalid_range(res);
                        return;
                    }

                    result = {
                        totalEvents: total,
                        totalPages: paging.totalPages,
                        currentPage: paging.offset,
                        pagination: {
                            prev: paging.prev,
                            next: paging.next
                        },
                        result:docs
                    };

                    serverResponse.result(res,result);
                });
            } else {
                serverResponse.result(res, result)
            }
        });

    }

};