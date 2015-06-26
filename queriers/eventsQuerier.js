require('../models/event')();

var mongoose = require('mongoose');
var pretty = require('../utils/pretty');
var config = require('config');
var serverResponse = require('../utils/resultResponse.js');
var pagination = require('../utils/pagination.js');

//max 4 connections in pool
var conn = mongoose.createConnection(config.get('db_uri'),{ server: { poolSize: 4 }});
//Album and Artist models are scoped to above specific connection object
var Event = conn.model('Event');

module.exports = {

    events:function queryEvents(res, params) {
        var range = pagination.range(params);
        var searchRule = params.searchRule;
        var sortRule = params.sortRule;

        Event.find(searchRule).sort(sortRule).paginate(range.offset, range.limit, function(err, docs, total) {
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

            serverResponse.result(res,result)
        });

    }
};