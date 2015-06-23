var pretty = require('./pretty');


module.exports = {

    error:function serverError(err) {
        res.statusCode = 500;
        res.end(pretty.print(excep.msg(500, 'Server Error', err)));
    },

    unauthorized:function unauthorized(res) {
        res.statusCode = 401;
        res.send('401 Unauthorized');
    },

    result:function(res,result){
        res.statusCode = 200;
        res.end(pretty.print(result));
    },

    invalid_range: function(res) {
        var result = {
            error: "offset of " + offset + " is out of range, must start with 1"
        };

        res.statusCode = 200;
        res.end(pretty.print(result));
    }

};