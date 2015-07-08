var assert = require("assert");
var config = require('config');
var app = require('../app.js');
var httpRequest = require('supertest')(app);
var db = require('./testRunnerHelper');

var basePath = '/api/v1/tracks';

describe('-------- TRACK ENDPOINTS --------', function() {

    var artist;
    var track;
    var token;
    var tokenPrefix = '?token=';

    //Do preliminary setup, before running each testcase.
    before(function(done) {
        var options = db.createDataForEndpoint('track');
        artist =  options.artist;
        track = options.track;
        token = tokenPrefix + db.createToken();

        done();
    });

    after(function(done) {
        db.dropAllCollections();
        done();
    });

    //Testcases

    describe('GET ' + basePath, function() {
        it('Should return a Track item', function(done) {
            httpRequest
                .get(basePath + token)
                .expect(200)
                .set('Accept','application/json')
                .expect('Content-Type', /json/)
                .end(function(err, res){
                    if (err)
                        throw err;

                    assert.equal(res.body.result[0]._id, track._id);
                    assert.equal(res.body.result[0].artists[0].artistName, artist.artistName);

                    done();
                });
        });
    });

    describe('GET ' + basePath + '/:trackId', function() {
        it('Should return a Track item whose id is provided', function(done) {
            httpRequest
                .get(basePath + '/' + track._id + token)
                .expect(200)
                .set('Accept','application/json')
                .expect('Content-Type', /json/)
                .end(function(err, res){
                    if (err)
                        throw err;

                    assert.equal(res.body.result[0]._id, track._id);
                    assert.equal(res.body.result[0].artists[0].artistName, artist.artistName);

                    done();
                });
        });
    });

    describe('GET ' + basePath + '/:artistId/artist', function() {
        it('Should return a Track item whose id is provided', function(done) {
            httpRequest
                .get(basePath + '/' + artist._id + '/artist' + token)
                .expect(200)
                .set('Accept','application/json')
                .expect('Content-Type', /json/)
                .end(function(err, res){
                    if (err)
                        throw err;

                    assert.equal(res.body.result[0]._id, track._id);
                    assert.equal(res.body.result[0].artists[0].artistName, artist.artistName);

                    done();
                });
        });
    });
});