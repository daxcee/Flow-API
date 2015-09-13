require('../../models/token')();

var config = require('config');
var mongoose = require('mongoose');
var conn = mongoose.createConnection(config.get('db_uri'),{ server: { poolSize: 4 }});
var resultResponse = require('../../utils/resultResponse.js');
var FBToken = conn.model('FBToken');
var tokenQuery = require('../../queriers/fbTokenQuerier.js');
var serverResponse = require('../../utils/resultResponse.js');

module.exports = {

    //Validate every API endpoint request, check if a token is: provided, valid, expired.
    validate:function(req,res,next){
        if(process.env.NODE_ENV === 'development') {
            next();
            return;
        }

        if (req.headers.authorization === undefined && !req.query.hasOwnProperty("token")) {
            resultResponse.unauthorized(res);
            return
        }

        var token = null;
        if(req.headers.authorization !== undefined){
            token = req.headers.authorization;
        } else {
            token = req.query.token;
        }

        tokenQuery.tokenById(token, function (err, result) {
            if (err) {
                console.log('token error:' + err);
                resultResponse.error(res, err);
                return
            }

            if (result) {
                if(result.value === token) {
                    next();

                } else {
                    resultResponse.unauthorized(res);
                }
            } else {
                resultResponse.unauthorized(res);
            }
        });
    }
};