var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded ({ extended: false });
var pg = require('pg');
var connectionString = 'postgres://localhost:5432/toDoList';

//static folder established
app.use( express.static('public'));

//server spinning until last call for alcohol
app.listen( 3000, 'localhost', function(req, res){
  console.log('Here we are at 3000, Bilo');
});

//establishes base URL
app.get( '/', function(req, res){
  console.log('The connection is established...Biggles');
  res.sendFile(path.resolve('views/index.html'));
});

//establishes path/route for deleting a chore
app.post('/postChoreDelete', urlencodedParser, function(req, res){
  console.log('Bilo about to delete ID ' + req.body.id );
  var thisID = req.body.id;
  pg.connect(connectionString, function(err, client, done){
    client.query('DELETE FROM tasks * WHERE id=' + thisID);
    done();
    res.end();//could be extra
  });
});

//establishes path/route for updating a chore's status
app.post('/postChoreUpdate', urlencodedParser, function(req, res){
  console.log('Bilo about to update ' + req.body.id );
  var thisID = req.body.id;
  pg.connect(connectionString, function(err, client, done){
    client.query('UPDATE tasks SET  * WHERE id=' + thisID);
    done();
    res.end();//could be extra
  });
});//end update post

//returns info from the database to the client side and DOM
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

//inserts chore entered from dom, via client.js into DB 'tasks'
app.post('/sendNewChore', urlencodedParser, function(req, res){
  console.log('Biggles is sending a task to Bilo...');
  pg.connect(connectionString, function(err, client, done){
    client.query( 'INSERT INTO tasks (chore, completed, date_assigned) VALUES ($1, $2, $3)', [req.body.chore, req.body.completed, 'NOW()']);
    done();
    res.end();//could be extra
  });
});//end sendNewChore --sends chore info from index.html all the way to write on the db
