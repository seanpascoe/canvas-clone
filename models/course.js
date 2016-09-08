var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Course = new Schema({
  name: {type: String, required: true},
  description: String,
  instructor: String
})

module.exports = mongoose.model('Course', Course);
