var express = require('express');
var bodyParser = require('body-parser');
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

app.listen(3000);

module.exports = { app };
