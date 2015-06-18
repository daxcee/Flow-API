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

passwordless.init(new MongoStore(config.get('db_uri')), {skipForceSessionSave:true});

var app = express();
require('heroku-self-ping')(config.get('app_url'));

var smtpServer  = email.server.connect({
    user:config.get('ms_user'),
    password:config.get('ms_pass'),
    host:config.get('ms_host'),
    ssl:true
});

// Set up a delivery service
passwordless.addDelivery(function(tokenToSend, uidToSend, recipient, callback) {
    var host = 'http://localhost:3000/';
    smtpServer.send({
        text:    'Hello!\nAccess your account here: http://'
        + host + '?token=' + tokenToSend + '&uid='
        + encodeURIComponent(uidToSend),
        from:    yourEmail,
        to:      recipient,
        subject: 'Token for Flow API'
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
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(passwordless.sessionSupport());
app.use(passwordless.acceptToken({ successRedirect: '/'}));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

fs.readdirSync(__dirname + '/models').forEach(function(filename) {
    if (~filename.indexOf('.js'))
        require(__dirname + '/models/' + filename)
});

app.listen(app.get('port'), function() {
    if(process.env.NODE_ENV == 'development'){
        console.log("Running at: " +
            process.env.LOCAL_HOST + ':' +
            app.get('port') +
            '\ndb_uri: ' + config.get('db_uri'));
    }
});



module.exports = app;