var assert = require("assert");
var server = require('../bin/www');
var request = require('request');
var basePath = 'http://localhost';
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

    //Test artists endpoint, GET response code
    it('GET /artists', function (done) {
        request(baseURL + '/api/artist', function (err,resp) {
            assert(!err);
            assert.equal(200, resp.statusCode);
            done();
        });
    });

    //Test tracks endpoint, GET Request content body, JSON list size
    it('GET /tracks', function(done){
        request(baseURL + '/api/tracks', function(err,resp,body){
            assert(!err);
            assert.equal(200, resp.statusCode);
            tracklist = JSON.parse(body);
            assert(tracklistlist.length, 0);
            done();
        });
    });
});