var MongoClient = require('mongodb').MongoClient;
var artistEndpoint = '/api/artists';
var mongoDBURL = 'mongodb://' + process.env.DB_USER + ':' +
    process.env.DB_PASSWORD + '@' +
    process.env.DB_HOST + ':' +
    process.env.DB_PORT + '/' +
    process.env.DB_NAME;

exports.area = function (mongoDBURL) {
    MongoClient.connect(mongoDBURL, function (err, db) {
        if (err) {
            console.log('Unable to connect to the mongoDB server. Error:', err);
        } else {
            console.log("Connected correctly to: ", mongoDBURL);

            var collection = db.collection('artists');

            // Query DB, artist collection
            collection.find({mediaType: 'bio'}).toArray(function (err, result) {
                if (err) {
                    console.log(err);
                    res.setHeader("Content-Type", "text");
                    res.end(err);
                } else if (result.length) {
                    console.log('Found:', result);
                    res.setHeader("Content-Type", "text");
                    res.end(JSON.stringify(result));
                } else {
                    console.log('No document(s) found with defined "find" criteria!');
                    res.setHeader("Content-Type", "application/json");
                    res.end('No document(s) found with defined "find" criteria!');
                }
                //Close connection
                db.close();
            });
        }

        return res;
    });
}
