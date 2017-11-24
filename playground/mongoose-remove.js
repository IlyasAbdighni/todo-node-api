const { ObjectID } = require('mongodb');
const { mongoose } = require('../server/db/mongoose');
const Todo = require('../server/models/Todo');
const { User } = require('../server/models/User');

// Todo.remove({}).then(result => {
//   console.log(result);
// });

// Todo.findOneAndRemove
// Tood.findByIdAndRemove
Todo.findByIdAndRemove('5a126d7a4e9e82829529bab5').then(todo => {
  console.log(todo);
});
