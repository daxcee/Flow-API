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
            console.log("In dev mode, no token authentication");
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
                    console.log("Token is valid: %s", token);
                    next();
                } else {
                    console.log("Token provided but is invalid");
                    resultResponse.unauthorized(res);
                    return false;
                }
            });
        } else {
            console.log("No token provided.");
            resultResponse.unauthorized(res);
            return false;
        }

        return false;
    }
};