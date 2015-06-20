var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var tokenSchema = new Schema({
    value: {type: String, index: true},
    createdAt: { type: Date, expires: '1h' },
    recipient:{type: String, index: true}
});

module.exports = mongoose.model('Token', tokenSchema);
