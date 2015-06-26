require('dotenv').load();

var passwordless = require('passwordless');
var MongoStore = require('passwordless-mongostore');
var email = require("emailjs");
var compression = require('compression');
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var fs = require('fs');
var requireDir = require('require-dir');
var routes = requireDir('./routes',{camelcase: true});
var config = require('config');
var expressSession = require('express-session');
var mongoose = require('mongoose');
var conn = mongoose.createConnection(config.get('db_uri'),{ server: { poolSize: 4 }});

var app = express();
require('heroku-self-ping')(config.get('app_url'));

var smtpServer  = email.server.connect({
    user:config.get('ms_user'),
    password:config.get('ms_pass'),
    host:config.get('ms_host'),
    ssl:true
});

passwordless.init(new MongoStore(config.get('db_uri')));

passwordless.addDelivery(
    function(tokenToSend, uidToSend, recipient, callback) {

        require('./models/token')();

        var Token = conn.model('Token');

        var d = new Date();
        var newToken = new Token({value:tokenToSend, createdAt:d});

        newToken.save();

        var message = 'Hi,\n\nYour API KEY (expires in 60 minutes) is:\n\n' +  tokenToSend +
            '\n\nUsage:\n\n' + 'To get all albums for example, your request on:\n' +
            config.get('app_url') + '/api/v1/albums' + '\n\n' + 'will become:\n'  + config.get('app_url') + '/api/v1/albums?apikey=' + tokenToSend + '\n' +
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

for (var i in routes)
    app.use('/', routes[i]);

app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(compression());
app.use(favicon(__dirname + '/public/images/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());app.use(expressSession({secret: '-!49m$.;!``.x', saveUninitialized: false, resave: false}));
app.use(expressSession({secret: '42', saveUninitialized: false, resave: false}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(passwordless.sessionSupport());
app.use(passwordless.acceptToken({ successRedirect: '/'}));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    res.statusCode = 404;
    res.sendFile(path.join(__dirname, 'public', '404.html'));});

app.listen(app.get('port'), function() {
    if(process.env.NODE_ENV == 'development'){
        console.log("Running at: " +
            process.env.LOCAL_HOST + ':' +
            app.get('port') +
            '\ndb_uri: ' + config.get('db_uri'));
    }
});

module.exports = app;