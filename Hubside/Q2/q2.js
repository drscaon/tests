/*
  Author: Daniel Regis SARMENTO CAON
  drscaon@gmail.com

  How to run:
  # node q2.js
*/

let express = require('express');
let bodyParser = require('body-parser');
let app = express();

let todos = [{id: 'jkhsdjkf', content: 'review this code'}];

app.use(bodyParser.json());

app.get('/todos', (req, res) => { // no need to say '/all'
  res.send(todos);
});

app.post('/todos', (req, res) => {

  let id = Math.random().toString(32).slice(2);
  while(todos[id]){
    id = Math.random().toString(32).slice(2);
  }

  todos.push({
    ...req.body,
    id: id
  });
  res.sendStatus(201);
});

app.get('/todos/:id', (req, res) => {
  let found = todos.find(function(todo){
    return todo.id === req.params.id;
  })
  if(found){
    res.send(found);
  }
  else{
    res.sendStatus(404); // not found
  }
});

app.put('/todos/:id', (req, res) => {
  let found = todos.find(function(todo){
    return todo.id === req.params.id;
  })

  if(found){
    found.content = req.body.content;
    res.sendStatus(200);
  }
  else{
    res.sendStatus(404); // not found
  }
});

app.get('/', (req, res) => {
  res.send('OK');
});

app.delete('/todos/:id', (req, res) => { // add possibility to erase, too
  let found = todos.find(function(todo){
    return todo.id === req.params.id;
  })

  if(found){
    todos.splice(todos.indexOf(found),1);
    res.sendStatus(200);
  }
  else{
    res.sendStatus(404); // not found
  }
});

app.listen(8080, () => {
  console.log('Listening on port 8080...');
});
