require('../models/artist')();

var mongoose = require('mongoose');
var pretty = require('../utils/pretty');
var config = require('config');
var serverResponse = require('../utils/resultResponse.js');
var pagination = require('../utils/pagination.js');

//max 4 connections in pool
var conn = mongoose.createConnection(config.get('db_uri'),{ server: { poolSize: 4 }});
//Artist model is scoped to above specific connection object
var Artist = conn.model('Artist');
var Track = conn.model('Track');

module.exports = {

    tracks: function queryTracks(res,params){
        var range = pagination.range(params);
        var sortRule = params.sortRule;
        var searchRule = params.searchRule;
        var fields = params.fields;

        console.log("searchQuery: %s", pretty.print(searchRule));

        Track.find(searchRule,fields).sort(sortRule).paginate(range.offset, range.limit, function(err, docs, total) {
            params.total = total;
            var paging = pagination.paging(res,params);
            if (err) {
                serverResponse.error(res,err);
                return;
            }
            if(paging.offset < 1 ) {
                serverResponse.invalid_range(res,paging.offset);
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

    tracksByArtist:function(res,params){
        var range = pagination.range(params);
        var sortRule = params.sortRule;
        var searchRule = params.searchRule;
        var fields = params.fields;
        var result = {};

        console.log("searchQuery: %s", pretty.print(searchRule));

        Artist.findOne(searchRule, function (err, artist) {
            if (err) {
                serverResponse.error(res, err);
                return
            }
            if (artist) {
                Track.find({'artists.artistName':  artist.artistName}, fields).sort(sortRule).paginate(range.offset, range.limit, function(err, docs, total) {
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
                serverResponse.result(res, result);
            }
        });
    }

};