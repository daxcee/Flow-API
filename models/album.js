var mongoose = require('mongoose');
var Schema = mongoose.Schema;
//require('../models/artist')();
//var Artist = mongoose.model('Artist');

var albumSchema = new Schema({
    genres: [{genreName: String}],
    title: String,
    artists: []
});

module.exports = mongoose.model('Album', albumSchema);
