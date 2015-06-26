var config = require('config');
var pretty = require('./pretty');
var serverResponse = require('../utils/resultResponse.js');

module.exports = {

  paging:function generate(res,params) {
      var prev, next;
      var limit = params.limit;
      var offset = params.offset;
      var pageCount = parseInt(limit);
      var totalPages = Math.ceil(parseInt(params.total / pageCount));

      if(offset < 1 ) {
          res.statusCode = 200;
          serverResponse.invalid_range(res,offset);
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
      }

      var result = {};

      result.limit = limit;
      result.offset = offset;
      result.pagecount = pageCount;
      result.totalPages = totalPages;
      result.prev = prev;
      result.next = next;

      return result;
  },

  range: function range(params){
      var limit = 100;                    //default
      var offset = 1;                     //default

      if(params.offset != null) {
          offset = params.offset;         //override default
      } else{
          params.offset = offset;
      }

      if(params.limit != null) {
          limit = params.limit;           //override default
      } else {
          params.limit = limit;
      }

      var range = {};
      range.limit = limit;
      range.offset = offset;

      return range;
  }


};