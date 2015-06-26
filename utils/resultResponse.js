var pretty = require('./pretty');
var config = require('config');
var path = require('path');

module.exports = {

    error:function serverError(res, err) {
        res.statusCode = 500;
        var result =  {
            errorCode: 500,
            error: {
                description:"500 Server error",
                message: err
            }
        };
        res.end(pretty.print(result));
    },

    unauthorized:function unauthorized(res) {
        res.statusCode = 401;
        var result =  {
            errorCode: 401,
            error: {
                description: "401 Unauthorized",
                message:"Unauthorized, need to provide a valid access token. To get a token, follow requestTokenURL"
            },
            requestTokenURL:config.get("app_url") + "/token-request"
        };
        res.end(pretty.print(result));
    },

    result:function(res,result){
        res.statusCode = 200;
        res.end(pretty.print(result));
    },

    invalid_range: function(res,offset) {
        res.statusCode = 400;
        var result = {
            errorCode:400,
            error: {
                description:"400 Bad request",
                message:"Offset of " + offset + " is out of range, must start with 1"
            }
        };
        res.end(pretty.print(result));
    },

     page_not_found:function(req, res) {
         res.statusCode = 404;
         res.sendFile(path.join(__dirname, '../public', '404.html'));
     }
};