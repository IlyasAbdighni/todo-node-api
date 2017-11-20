var express = require('express');
var bodyParser = require('body-parser');
const { ObjectID } = require('mongodb');
var { mongoose } = require('./db/mongoose');
var Todo = require('./models/Todo');
var User = require('./models/User');

var app = express();

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
  var todo = new Todo({
    text: req.body.text
  });
  todo.save().then(
    doc => {
      res.status(200).send(doc);
    },
    err => {
      res.status(400).send('Could not save on the serer');
    }
  );
});

app.get('/', (req, res) => {
  res.send('haha haha');
});

app.get('/todos', (req, res) => {
  Todo.find().then(
    todos => {
      res.send({ todos });
    },
    err => {
      res.status(400).send(err);
    }
  );
});

app.get('/todos/:id', (req, res) => {
  let id = req.params.id;
  if (!ObjectID.isValid(id)) {
    return res.status(404).send(null);
  }
  Todo.findById(id)
    .then(todo => {
      if (!todo) {
        return res.status(404).send();
      }
      res.send({ todo });
    })
    .catch(e => {
      res.status(400).send();
    });
});

app.delete('/todos/:id', (req, res) => {
  const id = req.params.id;
  if (!ObjectID.isValid(id)) {
    return res.status(400).send();
  }
  Todo.findByIdAndRemove(id)
    .then(todo => {
      if (!todo) {
        res.status(404).send();
      }
      res.status(200).send(todo);
    })
    .catch(err => {
      res.status(400).send();
    });
});

app.listen(3000);

module.exports = { app };
