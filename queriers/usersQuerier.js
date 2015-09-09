require('../models/user')();

var mongoose = require('mongoose');
var pretty = require('../utils/pretty');
var config = require('config');
var serverResponse = require('../utils/resultResponse.js');

//max 4 connections in pool
var conn = mongoose.createConnection(config.get('db_uri'),{ server: { poolSize: 4 }});
//User model is scoped to above specific connection object
var User = conn.model('User');

module.exports = {
    userById: function(res, userId,callback){
        User.findOne({ _Id: userId }, function (err, user) {
            if (err) {
                serverResponse.error(res,err);
                return;
            }

            callback(user);
        });
    }
};