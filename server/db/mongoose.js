const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://ilyas:gvlmaram@ds149535.mlab.com:49535/todo-api');

module.exports = { mongoose };
