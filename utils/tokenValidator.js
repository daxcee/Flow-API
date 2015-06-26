require('../models/token')();

var config = require('config');
var mongoose = require('mongoose');
var conn = mongoose.createConnection(config.get('db_uri'),{ server: { poolSize: 4 }});
var serverResponse = require('../utils/resultResponse.js');
var Token = conn.model('Token');

module.exports = {

    //Validate every API endpoint request, check if a token is: provided, valid, expired.
    validate:function(req,res){
        Token.findOne({'value': req.param('apikey')}, function (err, token) {
            if (err) {
                serverResponse.error(res, err);
                return;
            }

            if (!token) {
                serverResponse.unauthorized(res);
            }
        });
    }
};