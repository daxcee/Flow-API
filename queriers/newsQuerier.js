require('../models/news')();
require ('mongoose-pagination');

var mongoose = require('mongoose');
var config = require('config');
var serverResponse = require('../utils/resultResponse.js');
var pagination = require('../utils/pagination.js');

//max 4 connections in pool
var conn = mongoose.createConnection(config.get('db_uri'),{ server: { poolSize: 4 }});
//Event model is scoped to above specific connection object
var News = conn.model('News');

module.exports = {

    news:function queryNews(res, params) {
        var range = pagination.range(params);
        var searchRule = params.searchRule;
        var sortRule = params.sortRule;
        var fields = params.fields;

        News.find(searchRule,fields).sort(sortRule).paginate(range.offset, range.limit, function(err, docs, total) {
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
                totalNews: total,
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