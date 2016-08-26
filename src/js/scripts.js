"use strict";

let auth = require('./auth'),
    db = require('./db-interaction'),
    template = require('./template.js');

let currentMovie;

// LOGIN BUTTON FUNCTIONALITY
$('#loginButton').click(function() {
  auth().then(function(){
    $('#loginButton').html('Logout')
  });
});

// MOVIE SEARCH FUNCTIONALITY
$('#title').keypress(function(evt){
  if (evt.keyCode === 13) {
    let title = $('#title').val();
    db.searchOMDB(title)
      .then(function(data){
        currentMovie = data;
        $('#title').val("");
        template(data);
      });
  }
})

// SAVE MOVIE FUNCTIONALITY
$(document).on('click',".addMovie",function(){
  saveMovie(false)});
$(document).on('click',".watchedMovie",function(){
  saveMovie(true)});

function saveMovie (bool){
  currentMovie.watched = bool;
  currentMovie.rating = 0;
  db.saveMovie(currentMovie)
  .then(function(data) {
    console.log(data)
  });
}

