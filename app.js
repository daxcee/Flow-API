require('dotenv').load();

var compression = require('compression');
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var requireDir = require('require-dir');
var routes = requireDir('./routes',{camelcase: true});
var config = require('config');

var app = express();

require('heroku-self-ping')(config.get('app_url'));

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


// catch 404
app.use(function(req, res) {
    res.sendFile('404.html', { root: path.join(__dirname, './public') });

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