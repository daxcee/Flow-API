var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var FBTokenSchema = new Schema({
    expires: Number,
    appId: String,
    scopes:[],
    isValid:Boolean,
    value: String
});

module.exports = mongoose.model('FBToken', FBTokenSchema);