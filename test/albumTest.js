var assert = require("assert");
var config = require('config');
var app = require('../app.js');
var httpRequest = require('supertest')(app);
var db = require('./testRunnerHelper');

var basePath = '/api/v1/albums';

describe('-------- ALBUM ENDPOINTS --------', function() {
    var artist;
    var album;
    var token;

    //Do preliminary setup, before running each testcase.
    beforeEach(function(done) {
        db.dropAllCollections();

        var options = db.createDateForEndpoint('album');
        artist =  options.artist;
        album = options.album;

        var tokenPrefix = '?token=';
        token = tokenPrefix + db.createToken().value;

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
                .get(basePath + token)
                .expect(200)
                .set('Accept','application/json')
                .expect('Content-Type', /json/)
                .end(function(err, res){
                    if (err)
                        throw err;

                    assert.equal(res.body.result[0]._id, album._id);
                    assert.equal(res.body.result[0].artists[0].artistName, artist.artistName);

                    done();
                });
        });
    });

    describe('GET ' + basePath + '/:artistId/artist', function() {
        it('Should return an Album item that belongs to the artist found by its id', function(done) {
            httpRequest
                .get(basePath + '/' + artist._id + '/artist' + token)
                .expect(200)
                .set('Accept','application/json')
                .expect('Content-Type', /json/)
                .end(function(err, res){
                    if (err)
                        throw err;

                    assert.equal(res.body.result[0]._id, album._id);
                    assert.equal(res.body.result[0].artists[0].artistName, artist.artistName);

                    done();
                });
        });
    });
});