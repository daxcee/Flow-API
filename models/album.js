var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var albumSchema = new Schema({
    genres: [{genreName: String}],
    title: String,
    artists: [{artistName:String}]
});

module.exports = mongoose.model('Album', albumSchema);
