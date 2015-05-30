var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var genreSchema = new Schema({
    genreName: String,
    subGenres: [{genreName: String}]
});

module.exports = mongoose.model('genre', genreSchema);