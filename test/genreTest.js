var assert = require("assert");
var config = require('config');
var app = require('../app.js');
var httpRequest = require('supertest')(app);
var db = require('./utils/dbHelper');

var basePath = '/api/v1/genres';

describe('-------- GENRE ENDPOINTS --------', function() {

    var genre;
    var token;
    var tokenPrefix = '?token=';

    //Do preliminary setup, before running each testcase.
    before(function(done) {
        var options = db.createDataForEndpoint('genre');
        genre =  options.genre;
        token = tokenPrefix + db.createToken();

        done();
    });

    after(function(done) {
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
                    console.log('RES: ' + res.body.result[0]);
                    assert.equal(res.body.result[0]._id, genre._id);

                    done();
                });
        });
    });
});