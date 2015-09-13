var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    fbId:String,
    email:String,
    name: String,
    token:[{type: String, ref: 'FBToken'}]
});

module.exports = mongoose.model('User', userSchema);
