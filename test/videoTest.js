var assert = require("assert");
var config = require('config');
var app = require('../app.js');
var httpRequest = require('supertest')(app);
var db = require('./testRunnerHelper');

var basePath = '/api/v1/videos';

describe('-------- VIDEO ENDPOINTS --------', function() {

    var artist;
    var video;
    var token;
    var tokenPrefix = '?token=';

    //Do preliminary setup, before running each testcase.
    before(function(done) {

        var options = db.createDataForEndpoint('video');
        artist =  options.artist;
        video = options.video;
        token = tokenPrefix + db.createToken();

        done();
    });

    after(function(done) {
        db.dropAllCollections();
        done();
    });

    //Testcases

    describe('GET ' + basePath, function() {
        it('Should return a Video item', function(done) {
            httpRequest
                .get(basePath + token)
                .expect(200)
                .set('Accept','application/json')
                .expect('Content-Type', /json/)
                .end(function(err, res){
                    if (err)
                        throw err;

                    assert.equal(res.body.result[0]._id, video._id);

                    done();
                });
        });
    });

    describe('GET ' + basePath, function() {
        it('Should a Video item whose id is provided', function(done) {
            httpRequest
                .get(basePath + '/' + video._id + token)
                .expect(200)
                .set('Accept','application/json')
                .expect('Content-Type', /json/)
                .end(function(err, res){
                    if (err)
                        throw err;

                    assert.equal(res.body.result[0]._id, video._id);

                    done();
                });
        });
    });


    describe('GET ' + basePath + '/:artistId/artist', function() {
        it('Should return a Video item that belongs to the artist found by its id', function(done) {
            httpRequest
                .get(basePath + '/' + artist._id + '/artist' + token)
                .expect(200)
                .set('Accept','application/json')
                .expect('Content-Type', /json/)
                .end(function(err, res){
                    if (err)
                        throw err;

                    assert.equal(res.body.result[0]._id, video._id);
                    assert.equal(res.body.result[0].artists[0].artistName, artist.artistName);

                    done();
                });
        });
    });
});