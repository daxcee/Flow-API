var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    _Id:String,
    email:String,
    name: String
});

module.exports = mongoose.model('User', userSchema);
