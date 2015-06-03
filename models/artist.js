var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var artistSchema = new Schema({
    mediaType: String,
    artistName: String,
    artistBio: String,
    genres: [{genreName: String}],
    artistTrackListURL: String,
    artistSCID: String,
    artistSCURL: String,
    artistWebsite: String,
    artistFBURL: String
});

module.exports = mongoose.model('Artist', artistSchema);