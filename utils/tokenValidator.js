require('../models/token')();

var config = require('config');
var mongoose = require('mongoose');
var conn = mongoose.createConnection(config.get('db_uri'),{ server: { poolSize: 4 }});
var resultResponse = require('../utils/resultResponse.js');
var Token = conn.model('Token');

module.exports = {

    //Validate every API endpoint request, check if a token is: provided, valid, expired.
    validate:function(req,res,next){
        if(process.env.NODE_ENV === 'development') {
            next();

            return;
        }

        if (req.query.hasOwnProperty("token")) {
            var token = req.query.token;
            Token.findOne({'value': token}, function (err, token) {
                if (err) {
                    resultResponse.error(res, err);
                    return false;
                }

                if (token) {
                    next();
                } else {
                    resultResponse.unauthorized(res);
                    return false;
                }
            });
        } else {
            resultResponse.unauthorized(res);
            return false;
        }

        return false;
    }
};