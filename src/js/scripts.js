"use strict";

let auth = require('./auth'),
    db = require('./db-interaction'),
    buttonEvents = require('./button-events'),
    starHover = require('./star-hover'),
    template = require('./template.js'),
    firebase = require("firebase/app");

let OMDbMovies,
fbData= {},
OMDbIDs = [],
numberOfMovies;

var finalListOfMovies = {};

//IS A USER LOGGED IN?
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    showBtn ('logoutButton', 'loginButton');
    showProfileView();
  } else {
    showBtn ('loginButton', 'logoutButton');
  }
});

//SHOW THE CORRECT BUTTON BASED ON WHETHER USER IS LOGGED IN OR NOT
function showBtn (id1, id2){
  $(`#${id1}`).removeClass('hidden');
  $(`#${id2}`).addClass('hidden');
}

//Determine the number of movies in a user's watchlist
//to determine whether buttons need to be disabled
function checkNumberOfMovies (){
  db.getSavedMovies()
  .then((data)=>{
    if (data === null){
      disableButtons();
    } else {
      enableButtons();
    }
  })
}

function disableButtons(){
  $('.showUnwatched').addClass('disabled').removeClass('waves-effect').attr('disabled');
  $('.showWatched').addClass('disabled').removeClass('waves-effect').attr('disabled');
  $('.showFavorites').addClass('disabled').removeClass('waves-effect').attr('disabled');
}

function enableButtons(){
  $('.showUnwatched').removeClass('disabled').addClass('waves-effect').removeAttr('disabled');
  $('.showWatched').removeClass('disabled').addClass('waves-effect').removeAttr('disabled');
  $('.showFavorites').removeClass('disabled').addClass('waves-effect').removeAttr('disabled');
}

// LOGIN BUTTON FUNCTIONALITY
$(document).on('click', '#loginButton', function() {
  auth.loginWithGoogle()
  .then(function(){
    showBtn ('logoutButton', 'loginButton');
    checkNumberOfMovies();
    showProfileView();
  });
});

// LOGOUT BUTTON FUNCTIONALITY
$(document).on('click', '#logoutButton', function() {
  auth.logoutWithGoogle()
  .then(function(){
    showBtn ('loginButton', 'logoutButton');
    $('.mainBread').html('');
    $('.display').html("");
    disableButtons();
  });
});

// MOVIE SEARCH FUNCTIONALITY
$(document).on('keypress','#title',function(evt){
  if (evt.keyCode === 13) {
    $('.mainBread').html('Search > ');
    $('.secondBread').html('');
    finalListOfMovies = {};
    let title = $('#title').val();
     $('.firstMuffin').html(`${title}`);
    // Call firebase for filtered searh results
    db.getSavedMovies()
    .then((data)=>{
       fbData = data;
       console.log("first call to firebase", fbData)
    // Call OMDb for similar search results on title
       db.searchOMDB(title)
       .then(function(data){
         OMDbMovies = data;
         console.log("OMDBMOVIES", OMDbMovies);
         OMDbIDs = [];
      // Create array of IMDb IDs
         OMDbMovies.Search.forEach(function(movie) {
           OMDbIDs.push(movie.imdbID)
         });
         $('#title').val("");
         console.log("first call to OMDB", OMDbMovies);
         OMDbIDs.forEach(function(id, index){
           for (let movieOption in fbData) {
            // Compare OMDb and Firebase results
             if (fbData[movieOption].imdbID === id ) {
               OMDbIDs.splice(index, 1);
               finalListOfMovies[movieOption] = fbData[movieOption]
             }
           }
         });
         let i = 0;
         var numberOfMovies = OMDbIDs.length;
      // Call OMDb with IMDb IDs for actors
         OMDbIDs.forEach(function(ids, index) {
           db.getMovieByID(ids)
           .then(function(data) {
             finalListOfMovies[index] = data;
             i++;
             if (i === (numberOfMovies - 1)){
          // Print only unique results, with Firebase results taking priority
              console.log("final list of MOvies", finalListOfMovies);
              template.showProfile(finalListOfMovies);
              if (firebase.auth().currentUser === null){
                disableButtons();
              } else {
                checkNumberOfMovies();
              }
             }
           });
         });
      });
    });
  }
});

// SAVE MOVIE FUNCTIONALITY
$(document).on('click', ".addMovie", function(evt) {
    saveMovie(evt, false);
});

function saveMovie(evt, bool) {
  let key = $(evt.currentTarget).attr("key");
  finalListOfMovies[key].watched = bool;
  finalListOfMovies[key].rating = 0;
  finalListOfMovies[key].saved = true;
  db.saveMovie(finalListOfMovies[key])
  .then(function(data) {
    finalListOfMovies[data.path.o[2]] = finalListOfMovies[key];
    delete finalListOfMovies[key];
    template.showProfile(finalListOfMovies);
    enableButtons();
  });
}

// PROFILE DISPLAYS ON LOGIN
function showProfileView (){
  db.getSavedMovies()
    .then(function(data){
      finalListOfMovies = data;
      template.showProfile(finalListOfMovies);
      $('.mainBread').html('Home > ');
      checkNumberOfMovies();
    });
}

// DELETE BUTTON FUNCTIONALITY
$(document).on('click','.delete-btn',function(evt){
  let key = $(evt.currentTarget).attr("key");
  db.deleteMovie(key)
    .then(function(){
      delete finalListOfMovies[key];
      template.showProfile(finalListOfMovies);
      checkNumberOfMovies();
    });
});


// UPDATE MOVIE RATINGS
$(document).on('click', '.userRating', updateRating);

function updateRating (e){
  let movieId = $(e.currentTarget).attr('key');
  let ratingValue = $(e.currentTarget).attr('class').split(' ')[0];
  let rating = {"rating": ratingValue};
  db.updateMovie(movieId, rating)
    .then(()=>{
      finalListOfMovies[movieId].rating = ratingValue;
      template.showProfile(finalListOfMovies);
      enableButtons();
  });
}


$(document).on('click', '#homeLink', function(evt) {
  checkNumberOfMovies();
  showProfileView();
  $('.mainBread').html('Home > ');
  $('.secondBread').html('');
  $('.firstMuffin').html('');
});

//Button functionality
// $(document).on('click', '.showUntracked', function(evt) {
//   $('.filter').removeClass('cyan lighten-4');
//   let $activeFilter = $(evt.currentTarget);
//   $activeFilter.siblings().removeClass('active-button');
//   $activeFilter.addClass('cyan lighten-4');
//   $('.secondBread').html('Untracked');
//   $('.movieDiv').show();
//   $('.movieCard[saved=true]').parent('.movieDiv').hide();
// });

// $(document).on('click', '.showUnwatched', function(evt) {
//   db.getSavedMovies()
//   .then(function(data){
//     template.showProfile(data);
//     checkNumberOfMovies();
//     $('.filter').removeClass('cyan lighten-4');
//     let $activeFilter = $(evt.currentTarget);
//     $activeFilter.siblings().removeClass('active-button');
//     $('.secondBread').html('Unwatched');
//     $('.movieDiv').hide();
//     $('.movieCard[rating=0]').parent('.movieDiv').show();
//   });
//     $activeFilter.addClass('cyan lighten-4');
// });

// $(document).on('click', '.showWatched', function(evt) {
//    db.getSavedMovies()
//   .then(function(data){
//     template.showProfile(data);
//     checkNumberOfMovies();
//     $('.filter').removeClass('cyan lighten-4');
//     let $activeFilter = $(evt.currentTarget);
//     $activeFilter.siblings().removeClass('active-button');
//     $('.secondBread').html('Watched')
//     $('.movieDiv').hide();
//     $('.movieCard[saved=true]').parent('.movieDiv').show();
//     $('.movieCard[rating=0]').parent('.movieDiv').hide();
//   });
//     $activeFilter.addClass('cyan lighten-4');
// });

// $(document).on('click', '.showFavorites', function(evt) {
//    db.getSavedMovies()
//   .then(function(data){
//     template.showProfile(data);
//     checkNumberOfMovies();
//     $('.filter').removeClass('cyan lighten-4');
//     let $activeFilter = $(evt.currentTarget);
//     $activeFilter.siblings().removeClass('active-button');
//     $('.secondBread').html('Favorites')
//     $('.movieDiv').hide();
//     $('.movieCard[rating=10]').parent('.movieDiv').show();
//   });
//     $activeFilter.addClass('cyan lighten-4');
// });


