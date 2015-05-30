var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var trackSchema = new Schema({
    mediaType: String,
    artists: [{artistName: String}],
    albums: [{id: String, title: String}],
    duration: Number,
    genres: [{genreName: String}],
    songTitle: String
});

module.exports = mongoose.model('track', trackSchema);