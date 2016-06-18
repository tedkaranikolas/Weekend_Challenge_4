var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded ({ extended: false });
var pg = require('pg');
var connectionString = 'postgres://localhost:5432/toDoList';

//static established
app.use( express.static('public'));

//server spinning until last call
app.listen( 3000, 'localhost', function(req, res){
  console.log('Here we are at 3000, Bilo');
});

//establishing home-base URL
app.get( '/', function(req, res){
  console.log('The connection is being established...Biggles');
  res.sendFile(path.resolve('views/index.html'));
});//end base URL

app.post('/sendNewChore', urlencodedParser, function(req, res){
  console.log('Biggles is sending a task to Bilo...');
  pg.connect(connectionString, function(err, client, done){
    client.query( 'INSERT INTO tasks (chore, completed, date_assigned) VALUES ($1, $2, $3)', [req.body.chore, req.body.completed, 'NOW()']);//MUST FINISH POST LATER
  });
});//end sendNewChore --sends chore info from index.html all the way to write on the db

//need to return info from the database to the client side, etc. and then to the DOM
app.get('/retrieveChore', function(req, res){
  console.log('DB packaging for transfer to Biggles');
  var choreToDo = [];
  pg.connect(connectionString, function(err, client, done){
  var toDoRequest=client.query('SELECT * FROM tasks ORDER BY id DESC;');
  toDoRequest.on('row', function(row){
    choreToDo.push(row);
  });//end grabbing DB row
  toDoRequest.on('end', function(){
    done();
    console.log('Chore heading to Biggles ' + choreToDo);
    return res.json(choreToDo);
  });
    if(err){
      console.log('error, Biggles');
    }
  });//end pg.connect
});//end retrieveChore route
