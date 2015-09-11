var assert = require("assert");
var db = require('./utils/dbHelper');
var MockedHTTPResponse = require('./utils/HTTPResponse.js');
var HTTPClient = require('./utils/HTTPClient.js');

describe('-------- NEWS ENDPOINTS --------', function() {
    var basePath = '/api/v1/news';
    var endpoint = '/news';
    var news;

    //Do preliminary setup, before running each testcase.
    before(function(done) {
        var options = db.createDataForEndpoint('news');
        news = options.news;
        done();
    });

    after(function(done) {
        db.dropAllCollections();
        done();
    });

    //Testcases

    describe('GET ' + basePath, function() {
        it('Should return a News item', function(done) {
            var httpResponse = new MockedHTTPResponse(basePath,endpoint);

            httpResponse.setGETResponse(200,{ news:news});

            var options = {
                statusCode:200,
                headers:{
                    accept: [{Accept:'application/json'}],
                    expect: [{'Content-Type':'application/json'}]
                }
            };

            var httpClient = new HTTPClient(basePath);
            httpClient.doGet(endpoint,options,function(res){
                assert.equal(res.body.news._id, news._id);
                done()
            });
        });
    });

    describe('GET ' + basePath + '/:newsId', function() {
        it('Should a News item whose id is provided', function(done) {
            var resource = endpoint + '/:newsId';
            var httpResponse = new MockedHTTPResponse(basePath,resource);

            httpResponse.setGETResponse(200,{ news:news});

            var options = {
                statusCode:200,
                headers:{
                    accept: [{Accept:'application/json'}],
                    expect: [{'Content-Type':'application/json'}]
                }
            };

            var httpClient = new HTTPClient(basePath);
            httpClient.doGet(resource,options,function(res){
                assert.equal(res.body.news._id, news._id);
                done()
            });
        });
    });

    describe('GET ' + basePath + '/:date(dd-mm-yyyy)/date', function() {
        it('Should a News item whose id is provided', function(done) {
            var resource = endpoint + '/' + news.date + '/date';
            var httpResponse = new MockedHTTPResponse(basePath,resource);

            httpResponse.setGETResponse(200,{ news:news});

            var options = {
                statusCode:200,
                headers:{
                    accept: [{Accept:'application/json'}],
                    expect: [{'Content-Type':'application/json'}]
                }
            };

            var httpClient = new HTTPClient(basePath);
            httpClient.doGet(resource,options,function(res){
                assert.equal(res.body.news._id, news._id);
                assert.equal(res.body.news.date, news.date);
                done()
            });
        });
    });
});