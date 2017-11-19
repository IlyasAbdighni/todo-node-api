const { ObjectID } = require('mongodb');
const { mongoose } = require('../server/db/mongoose');
const Todo = require('../server/models/Todo');

var id = '5a11950436514e6c5369e2424';

if (!ObjectID.isValid(id)) {
  console.log('Id is not valid');
}

// Todo.find().then(todos => {
//   console.log('Todos ', todos);
// });

Todo.findOne({
  _id: id
}).then(todo => {
  console.log('todo ', todo);
});

Todo.findById(id).then(todo => {
  if (!todo) {
    return console.log('id not found');
  }
  console.log('todo find by id ', todo);
});
