var assert = require("assert");
var config = require('config');
var app = require('../app.js');
var httpRequest = require('supertest')(app);
var db = require('./testRunnerHelper');

var basePath = '/api/v1/news';

describe('-------- NEWS ENDPOINTS --------', function() {
    var news;
    var token;

    //Do preliminary setup, before running each testcase.
    beforeEach(function(done) {
        db.dropAllCollections();

        var options = db.createDateForEndpoint('news');
        news =  options.news;

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
        it('Should return a News item', function(done) {
            httpRequest
                .get(basePath + token)
                .expect(200)
                .set('Accept','application/json')
                .expect('Content-Type', /json/)
                .end(function(err, res){
                    if (err)
                        throw err;

                    assert.equal(res.body.result[0]._id, news._id);

                    done();
                });
        });
    });

    describe('GET ' + basePath + '/:newsId', function() {
        it('Should a News item whose id is provided', function(done) {
            httpRequest
                .get(basePath + '/' + news._id + token)
                .expect(200)
                .set('Accept','application/json')
                .expect('Content-Type', /json/)
                .end(function(err, res){
                    if (err)
                        throw err;

                    assert.equal(res.body.result[0]._id, news._id);

                    done();
                });
        });
    });

    describe('GET ' + basePath + '/:date(dd-mm-yyyy)/date', function() {
        it('Should a News item whose id is provided', function(done) {
            httpRequest
                .get(basePath + '/' + news.date + '/date' + token)
                .expect(200)
                .set('Accept','application/json')
                .expect('Content-Type', /json/)
                .end(function(err, res){
                    if (err)
                        throw err;

                    assert.equal(res.body.result[0]._id, news._id);
                    assert.equal(res.body.result[0].date, news.date);

                    done();
                });
        });
    });


});