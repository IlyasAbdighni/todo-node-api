var mongoose = require('mongoose');
const Schema = mongoose.Schema;

const todoSchema = new Schema({
  text: {
    type: String,
    require: true,
    minLength: 1,
    trim: true
  },
  completed: {
    type: Boolean,
    default: false
  },
  completedAt: {
    type: Number,
    default: null
  }
});

module.exports = mongoose.model('Todo', todoSchema);
