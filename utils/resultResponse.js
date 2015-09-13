var pretty = require('./pretty');
var config = require('config');
var path = require('path');

module.exports = {

    error:function serverError(res, err) {
        res.writeHead(res.statusCode, {"Content-Type": "application/json"});
        var result =  {
            errorCode: res.statusCode,
            error: {
                description: res.statusCode + "Server error",
                message: err
            }
        };
        res.end(pretty.print(result));
    },

    invalidFBToken:function invalidFBToken(res,data) {
        res.writeHead(401, {"Content-Type": "application/json"});
        var result =  {
            errorCode: 401,
            error: {
                message:data
            }
        };
        res.end(pretty.print(result));
    },

    unauthorized:function unauthorized(res) {
        res.writeHead(401, {"Content-Type": "application/json"});
        var result =  {
            errorCode: 401,
            error: {
                description: "401 Unauthorized",
                message:"Unauthorized, need to provide a valid access token."
            }
        };
        res.end(pretty.print(result));
    },

    result:function(res,result){
        res.writeHead(200, {"Content-Type": "application/json"});
        res.end(pretty.print(result));
    },

    invalid_range: function(res,offset) {
        res.writeHead(400, {"Content-Type": "application/json"});
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
         res.writeHead(404, {"Content-Type": "text/html; charset=UTF-8"});

         res.statusCode = 404;
         res.sendFile(path.join(__dirname, '../public', '404.html'));
     }
};