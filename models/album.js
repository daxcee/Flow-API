var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var albumSchema = new Schema({
    genres: [{genreName: String}],
    title: String,
    artists: []
});

module.exports = mongoose.model('Album', albumSchema);
