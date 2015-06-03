var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var trackSchema = new Schema({
    mediaType: String,
    artists: [],
    albums: [],
    duration: Number,
    genres: [{genreName: String}],
    songTitle: String
});

module.exports = mongoose.model('Track', trackSchema);