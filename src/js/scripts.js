"use strict";

let auth = require('./auth'),
    db = require('./db-interaction'),
    template = require('./template.js');

let currentMovie;

// LOGIN BUTTON FUNCTIONALITY
$('#loginButton').click(function() {
  auth().then(function(){
    $('#loginButton').html('Logout');
    $('.findMovies').removeClass("hidden");
    $('.profile').removeClass("hidden");
  });
});

// MOVIE SEARCH FUNCTIONALITY
$(document).on('keypress','#title',function(evt){
  if (evt.keyCode === 13) {
    let title = $('#title').val();
    db.searchOMDB(title)
      .then(function(data){
        currentMovie = data;
        $('#title').val("");
        template.showSearchResults(data);
      });
  }
});

$(document).on('click', '.findMovies', showFindMovies);

function showFindMovies(){
  template.showFindMovie();
}

// SAVE MOVIE FUNCTIONALITY
$(document).on('click',".addMovie",function(){
  saveMovie(false);});
$(document).on('click',".watchedMovie",function(){
  saveMovie(true);});

function saveMovie (bool){
  currentMovie.watched = bool;
  currentMovie.rating = 0;
  db.saveMovie(currentMovie)
  .then(function(data) {
    console.log(data);
    $('.content').html("");
  });
}

// PROFILE FUNCTIONALITY

$(document).on('click','.profile',function(){
  db.getSavedMovies()
    .then(function(data){
      template.showProfile(data);
    });
});

// DELETE BUTTON FUNCTIONALITY

$(document).on('click','.delete-btn',function(evt){
  let key = $(evt.currentTarget).attr("key");
  db.deleteMovie(key)
    .then(function(){
      db.getSavedMovies()
        .then(function(data){
          template.showProfile(data);
        });
    });
});

// SHOW UNWATCHED OR WATCHED FILMS WITHIN PROFILE

$(document).on('click', '.showWatched', function() {
  $('.movieCard').css('display', 'inline-block');
  $('.watchedMovie').parent().css('display', 'none');
});

$(document).on('click', '.showUnwatched', function() {
  $('.movieCard').css('display', 'inline-block');
  $('.rating').parent().css('display', 'none');
});

$(document).on('click', '.showAll', function() {
  $('.movieCard').css('display', 'inline-block');
});
