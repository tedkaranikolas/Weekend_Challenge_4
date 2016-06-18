// Here are the specific components for the challenge:
//
// x--Create a front end experience that allows a user to create a task.
// x--When the task is created, it should be stored inside of a database (SQL)
// Whenever a task is created the front end should refresh to show all tasks that need to be completed.
// Each task should have an option to 'Complete' or 'Delete'.
// When a task is complete, its visual representation should change on the front end (for example, the background of the task container could change from gray to green, as well as the complete option 'checked off'. Each of these are accomplished in CSS, but will need to hook into logic to know whether or not the task is complete)
// Whether or not a task is complete should also be stored in the database.
// Deleting a task should remove it both from the Front End as well as the Database.

console.log('hello from client.js');

$(document).ready (function(){
  console.log('hello from jquery');

  $('#addChore').on('click', function(){
  console.log('button clicked');
  var enteredChore = $('#choreIn').val();
  var newChore = {
    "chore" : enteredChore,
    "completed": false
  };
    console.log('newChore ' + enteredChore);
  $.ajax({
    type: 'POST',
    url: '/sendNewChore',
    data: newChore
    });//end ajax
});//end onclick function

function getFromDB(){
    $.ajax({
      type: 'GET',
      url: '/retrieveChore',
      success: function(data){
        choreDisplay(data);
    }
  });
}

function choreDisplay(choreData){
  $('#addChore').val('');
  $('#outputDiv').empty();
  for( var i = 0; i<choreToDo.length; i++){
    var choreListed = '<p>' + choreTodo[i].chore + ', Completed: ' + choreTodo[i].completed + ', Date Assigned: ' + choreTodo[i].date_assigned + '</p>';
     console.log(choreListed);
     $('#outputDiv').append(choreListed);
  }//end for loop to generate 'cells' for display
 }//function to append end
});//end jquery
