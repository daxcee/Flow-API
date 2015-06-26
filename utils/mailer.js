
var passwordless = require('passwordless');
var MongoStore = require('passwordless-mongostore');
var email = require("emailjs");
var config = require('config');
var mongoose = require('mongoose');
var conn = mongoose.createConnection(config.get('db_uri'),{ server: { poolSize: 4 }});

var smtpServer  = email.server.connect({
    user:config.get('ms_user'),
    password:config.get('ms_pass'),
    host:config.get('ms_host'),
    ssl:true
});

module.exports = {
    instance: function () {
      return passwordless;
    },

    initStore:function(){
        passwordless.init(new MongoStore(config.get('db_uri')));
    },

    config: function(){
        passwordless.addDelivery(
            function(tokenToSend, uidToSend, recipient, callback) {

                require('../models/token')();

                var Token = conn.model('Token');

                var d = new Date();
                var newToken = new Token({value:tokenToSend, createdAt:d});

                newToken.save();

                var message = 'Hi,\n\nYour API KEY (expires in 60 minutes) is:\n\n' +  tokenToSend +
                    '\n\nUsage:\n\n' + 'To get all albums for example, your request on:\n' +
                    config.get('app_url') + '/api/v1/albums' + '\n\n' + 'will become:\n'  + config.get('app_url') + '/api/v1/albums?token=' + tokenToSend + '\n\n' +
                    'Full Endpoints overview:\n' + config.get('app_url') + '\n\nBest regards,\n---\nFlow API\n';

                // Send out token
                smtpServer.send({
                    text: message,
                    from:    'Flow API ' + config.get('ms_user'),
                    to:      recipient,
                    subject: 'Flow API Token'
                }, function(err, message) {
                    if(err) {
                        console.log(err);
                    }
                    callback(err);
                });
            });


    }

};