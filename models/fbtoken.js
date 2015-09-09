var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var FBTokenSchema = new Schema({
    _userId: { type: String, ref: 'User' },
    expires: Number,
    appId: String,
    scopes:[],
    isValid:Boolean
});

module.exports = mongoose.model('FBToken', FBTokenSchema);