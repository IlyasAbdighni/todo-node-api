var mongoose = require('mongoose');
const Schema = mongoose.Schema;

var userSchema = new Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    minLength: 1
  }
});
module.exports = mongoose.model('User', userSchema);
