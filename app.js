require('dotenv').load();
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var routes = require('./routes/index');
var app = express();
var host = process.env.DB_HOST;
var db_port = process.env.DB_PORT;
var db_name = process.env.DB_NAME;
var db_user = process.env.DB_USER;
var db_pass = process.env.DB_PASSWORD;
var url = 'mongodb://' + db_user + ':' + db_pass + '@' + host + ':' + db_port + '/' + db_name;
var MongoClient = require('mongodb').MongoClient;
//app.set('port', (process.env.PORT || 3000)); //enable this when deploying to Heroku.

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(favicon(__dirname + '/public/images/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', routes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

app.listen(app.get('port'), function() {
    console.log("Node app is running at localhost:" + app.get('port'));
});

MongoClient.connect(url, function(err, db) {
    if (err) {
        console.log('Unable to connect to the mongoDB server. Error:', err);
    } else {
        console.log("Connected correctly to: ", url);
    }

    //Close connection
    db.close();
});

module.exports = app;