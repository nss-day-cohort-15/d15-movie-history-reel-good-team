"use strict";

let auth = require('./auth'),
    db = require('./db-interaction'),
    template = require('./template.js'),
    firebase = require("firebase/app");

let currentMovie;

//IS A USER LOGGED IN?
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    showBtn ('logoutButton', 'loginButton');
    $('.findMovies').removeClass("hidden");
    $('.profile').removeClass("hidden");
  } else {
    showBtn ('loginButton', 'logoutButton');
  }
});

//SHOW THE CORRECT BUTTON BASED ON WHETHER USER IS LOGGED IN OR NOT
function showBtn (id1, id2){
  $(`#${id1}`).removeClass('hidden');
  $(`#${id2}`).addClass('hidden');
}

// LOGIN BUTTON FUNCTIONALITY
$(document).on('click', '#loginButton', function() {
  auth.loginWithGoogle()
  .then(function(){
    console.log("welcome!");
    showBtn ('logoutButton', 'loginButton');
    $('.findMovies').removeClass("hidden");
    $('.profile').removeClass("hidden");
    showProfileView();
  });
});

// LOGOUT BUTTON FUNCTIONALITY
$(document).on('click', '#logoutButton', function() {
  auth.logoutWithGoogle()
  .then(function(){
    console.log("goodbye");
    showBtn ('loginButton', 'logoutButton');
    $('.findMovies').addClass("hidden");
    $('.profile').addClass("hidden");
    $('.display').html("");
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
$(document).on('click','.profile', showProfileView);

function showProfileView (){
  db.getSavedMovies()
    .then(function(data){
      template.showProfile(data);
    });
}

// DELETE BUTTON FUNCTIONALITY
$(document).on('click','.delete-btn',function(evt){
  let key = $(evt.currentTarget).attr("key");
  db.deleteMovie(key)
    .then(function(){
      reloadProfile();
    });
});

// SHOW UNWATCHED OR WATCHED FILMS WITHIN PROFILE
$(document).on('click', '.showWatched', function() {
  $('.movieCard').css('display', 'inline-block');
  $('.watchedMovieProfile').parent().css('display', 'none');
});

$(document).on('click', '.showUnwatched', function() {
  $('.movieCard').css('display', 'inline-block');
  $('.rating').parent().css('display', 'none');
});

$(document).on('click', '.showAll', function() {
  $('.movieCard').css('display', 'inline-block');
});

// UPDATE SEEN MOVIES IN PROFILE
$(document).on('click', '.watchedMovieProfile', updateWatchedMovie);
$(document).on('keypress', '.userRating', updateRating);

function updateWatchedMovie (e){
  let movieId = $(e.currentTarget).attr('key');
  let watched = {"watched": true};
  db.updateMovie(movieId, watched)
    .then(()=>{
      showProfileView();
    });
}

//UPDATE THE RATING GIVEN
function updateRating (e){
  if (e.keyCode === 13 && $('.userRating').val()) {
    let movieId = $(e.currentTarget).attr('key');
    let rating= {"rating": $('.userRating').val()};
    db.updateMovie(movieId, rating)
      .then(()=>{
        console.log("rating?", rating);
        showProfileView();
      });
    }
}





