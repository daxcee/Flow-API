var assert = require("assert");
var server = require('../bin/www');
var request = require('request');
var basePath = 'http://localhost';
var config = require('config');

var port = 3000;
var baseURL = basePath + ':' + port;

describe('server', function () {
    before(function () {
        server.listen(port);
    });

    after(function () {
        server.close();
    });
});

describe('/', function () {
    //Test whether the server is running
    it('GET /', function (done) {
        request(baseURL, function (err,resp) {
            assert(!err);
            assert.equal(200, resp.statusCode);
            done();
        });
    });

    //Test retrieve all artists details
    it('GET api/v1/artists', function (done) {
        request(baseURL + '/api/v1/artists?token='+ config.get('apikey'), function (err,resp) {
            assert(!err);
            assert.equal(200, resp.statusCode);
            done();
        });
    });

});