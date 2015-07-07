var assert = require("assert");
var config = require('config');
var app = require('../app.js');
var httpRequest = require('supertest')(app);
var db = require('./DatabaseHelper');

var basePath = '/api/v1/tracks';

describe('-------- TRACK ENDPOINTS --------', function() {
    var artistId;
    var artistName;
    var trackId;

    //Do preliminary setup, before running each testcase.
    beforeEach(function(done) {
        db.dropAllCollections();

        var options = db.createDateForEndpoint('track');
        artistId =  options.artist._id;
        artistName = options.artist.artistName;
        trackId = options.track._id;

        done();
    });

    afterEach(function(done) {
        db.dropAllCollections();
        done();
    });

    //Testcases

    describe('GET ' + basePath, function() {
        it('Should return a Track item', function(done) {
            httpRequest
                .get(basePath)
                .expect(200)
                .set('Accept','application/json')
                .expect('Content-Type', /json/)
                .end(function(err, res){
                    if (err)
                        throw err;

                    assert.equal(res.body.result[0]._id, trackId);
                    assert.equal(res.body.result[0].artists[0].artistName, artistName);

                    done();
                });
        });
    });

    describe('GET ' + basePath + '/:trackId', function() {
        it('Should return a Track item whose id is provided', function(done) {
            httpRequest
                .get(basePath + '/' + trackId)
                .expect(200)
                .set('Accept','application/json')
                .expect('Content-Type', /json/)
                .end(function(err, res){
                    if (err)
                        throw err;

                    assert.equal(res.body.result[0]._id, trackId);
                    assert.equal(res.body.result[0].artists[0].artistName, artistName);

                    done();
                });
        });
    });

    describe('GET ' + basePath + '/:artistId/artist', function() {
        it('Should return a Track item whose id is provided', function(done) {
            httpRequest
                .get(basePath + '/' + artistId + '/artist')
                .expect(200)
                .set('Accept','application/json')
                .expect('Content-Type', /json/)
                .end(function(err, res){
                    if (err)
                        throw err;

                    assert.equal(res.body.result[0]._id, trackId);
                    assert.equal(res.body.result[0].artists[0].artistName, artistName);

                    done();
                });
        });
    });
});