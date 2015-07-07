var assert = require("assert");
var config = require('config');
var app = require('../app.js');
var httpRequest = require('supertest')(app);
var db = require('./DatabaseHelper');

var basePath = '/api/v1/albums';

describe('-------- ALBUM ENDPOINTS --------', function() {
    var artistId;
    var artistName;
    var albumId;

    //Do preliminary setup, before running each testcase.
    beforeEach(function(done) {
        db.dropAllCollections();

        var options = db.createDateForEndpoint('album');
        artistId =  options.artist._id;
        artistName = options.artist.artistName;
        albumId = options.album._id;

        done();
    });

    afterEach(function(done) {
        db.dropAllCollections();
        done();
    });

    //Testcases

    describe('GET ' + basePath, function() {
        it('Should return an Album item', function(done) {
            httpRequest
                .get(basePath)
                .expect(200)
                .set('Accept','application/json')
                .expect('Content-Type', /json/)
                .end(function(err, res){
                    if (err)
                        throw err;

                    assert.equal(res.body.result[0]._id, albumId);
                    assert.equal(res.body.result[0].artists[0].artistName, artistName);

                    done();
                });
        });
    });

    describe('GET ' + basePath + '/:artistId/artist', function() {
        it('Should return an Album item that belongs to the artist found by its id' + artistId, function(done) {
            httpRequest
                .get(basePath + '/' + artistId + '/artist')
                .expect(200)
                .set('Accept','application/json')
                .expect('Content-Type', /json/)
                .end(function(err, res){
                    if (err)
                        throw err;

                    assert.equal(res.body.result[0]._id, albumId);
                    assert.equal(res.body.result[0].artists[0].artistName, artistName);

                    done();
                });
        });
    });
});