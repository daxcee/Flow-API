var assert = require("assert");
var server = require('../bin/www');
var request = require('request');
var basePath = 'http://localhost:3000';

describe('server', function () {
    before(function () {
        server.listen(3000);
    });

    after(function () {
        server.close();
    });
});

describe('/', function () {
    //Test whether the server is running
    it('GET /', function (done) {
        request(basePath, function (err,resp) {
            assert(!err);
            assert.equal(200, resp.statusCode);
            done();
        });
    });

    //Test artists endpoint, GET response code
    it('GET /players', function (done) {
        request(basePath + '/api/artist', function (err,resp) {
            assert(!err);
            assert.equal(200, resp.statusCode);
            done();
        });
    });

    //Test tracks endpoint, GET Request content body, JSON list size
    it('GET /players', function(done){
        request(basePath + '/api/tracks', function(err,resp,body){
            assert(!err);
            assert.equal(200, resp.statusCode);
            tracklist = JSON.parse(body);
            assert(tracklistlist.length, 0);
            done();
        });
    });
});