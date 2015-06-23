var pretty = require('./pretty');
var excep = require('../utils/exception');
var config = require('config');

module.exports = {

    error:function serverError(res, err) {
        res.statusCode = 500;
        var result =  {
            errorCode: 500,
            error: err
        };
        res.end(pretty.print(result));
    },

    unauthorized:function unauthorized(res) {
        res.statusCode = 401;
        var result =  {
            errorCode: 401,
            error: "Unauthorized, need to provide a valid access token. To get a token, follow requestTokenURL",
            requestTokenURL:config.get("app_url")
        };
        res.end(pretty.print(result));
    },

    result:function(res,result){
        res.statusCode = 200;
        res.end(pretty.print(result));
    },

    invalid_range: function(res) {
        res.statusCode = 400;
        var result = {
            errorCode:400,
            error: "Offset of " + offset + " is out of range, must start with 1"
        };
        res.end(pretty.print(result));
    }

};