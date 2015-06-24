var mongoose = require('mongoose');
var pretty = require('../utils/pretty');
var config = require('config');
var serverResponse = require('../utils/resultResponse.js');
var pagination = require('../utils/pagination.js');

//max 4 connections in pool
var conn = mongoose.createConnection(config.get('db_uri'),{ server: { poolSize: 4 }});
//Artist model is scoped to above specific connection object
var Artist = conn.model('Artist');
var Video = conn.model('Video');

module.exports = {

    videos: function queryVideos(res,params){
        var range = pagination.range(params);
        var sortRule = params.sortRule;
        var searchRule = params.searchRule;
        console.log("searchQuery: %s", pretty.print(searchRule));

        Video.find(searchRule).sort(sortRule).paginate(range.offset, range.limit, function(err, docs, total) {
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

    videosOfArtists:function(res,params){
        var range = pagination.range(params);
        var sortRule = params.sortRule;
        var searchRule = params.searchRule;
        var result = {};

        console.log("searchQuery: %s", pretty.print(searchRule));

        Artist.findOne(searchRule, function (err, artist) {
            if (err) {
                serverResponse.error(res, err);
                return
            }
            if (artist) {
                Video.find({'artists.artistName':  artist.artistName}).sort(sortRule).paginate(range.offset, range.limit, function(err, docs, total) {
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