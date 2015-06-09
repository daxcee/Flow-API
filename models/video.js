var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var videoSchema = new Schema({
    youtubeId: String,
    videoId: String,
    title:String,
    description:String,
    publishedAt:String,
    thumbnails:[],
    position:Number,
    resourceId:[],
    artists: []
});

module.exports = mongoose.model('Video', videoSchema);