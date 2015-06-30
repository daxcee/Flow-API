var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var newsSchema = new Schema({
    date: String,
    title: String,
    message: String,
    images:{
        thumb:String,
        cover:String
    }
});

module.exports = mongoose.model('News', newsSchema);
