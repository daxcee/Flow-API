require('../models/user')();

var mongoose = require('mongoose');
var pretty = require('../utils/pretty');
var config = require('config');
var serverResponse = require('../utils/resultResponse.js');

//max 4 connections in pool
var conn = mongoose.createConnection(config.get('db_uri'),{ server: { poolSize: 4 }});
//User model is scoped to above specific connection object
var User = conn.model('User');
var FBToken = conn.model('FBToken');

module.exports = {
    tokenById: function(token,callback){
        console.log('query tokne: ' + token);

        FBToken.findOne({value:token }, function (err, result) {
            if (err) {
                console.log('error on finding token: ' + err);
                callback(err,result);
                return
            }

            if(result) {
                console.log('found token: ' + JSON.stringify(result));
                callback(err,result);
                return
            }
            else {
                console.log('did not finnd token: ' + JSON.stringify(result));
                callback(err,result);
            }
        });
    }
};