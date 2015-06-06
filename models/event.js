var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var eventSchema = new Schema({
    fid: String,
    id: String,
    date: String,
    title: String,
    venue: String,
    city: String,
    artists: []
});

module.exports = mongoose.model('Event', albumSchema);


