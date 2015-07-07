var assert = require("assert");
var config = require('config');
var app = require('../app.js');
var httpRequest = require('supertest')(app);
var db = require('./testRunnerHelper');

var basePath = '/api/v1/genres';

describe('-------- GENRE ENDPOINTS --------', function() {
    var genre;
    var token;

    //Do preliminary setup, before running each testcase.
    beforeEach(function(done) {
        db.dropAllCollections();

        var options = db.createDateForEndpoint('genre');
        genre =  options.genre;

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
        it('Should return a Genre item', function(done) {
            httpRequest
                .get(basePath + token)
                .expect(200)
                .set('Accept','application/json')
                .expect('Content-Type', /json/)
                .end(function(err, res){
                    if (err)
                        throw err;

                    assert.equal(res.body.result[0]._id, genre._id);

                    done();
                });
        });
    });

    describe('GET ' + basePath + '/:genreName', function() {
        it('Should return a Genre item whose name is provided', function(done) {
            httpRequest
                .get(basePath + '/' + genre.genreName + token)
                .expect(200)
                .set('Accept','application/json')
                .expect('Content-Type', /json/)
                .end(function(err, res){
                    if (err)
                        throw err;
                    console.log("RES: " + JSON.stringify(res.body));

                    assert.equal(res.body.result[0]._id, genre._id);

                    done();
                });
        });
    });
});