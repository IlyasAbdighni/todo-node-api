const {ObjectID} =require('mongodb');
const Todo = require('../../models/Todo');
const User = require('../../models/User');

const todos = [
  {
    _id: new ObjectID(),
    text: 'First test todo'
  },
  {
    _id: new ObjectID(),
    text: 'Second test todo'
  }
];

const populateTodos = done => {
  Todo.remove({})
    .then(() => {
      return Todo.insertMany(todos);
    })
    .then(() => done());
}

module.exports = {todos, populateTodos}
