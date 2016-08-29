"use strict";

let auth = require('./auth'),
    db = require('./db-interaction'),
    template = require('./template.js'),
    firebase = require("firebase/app");

let OMDbMovies,
fbData= {},
OMDbIDs = [],
finalListOfMovies= {};

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
    // Call firebase for filtered searh results
    db.getSavedMovies()
      .then((data)=>{
        // Create array of IMDb IDs
         fbData = data;
         console.log("first call to firebase", fbData)
         db.searchOMDB(title)
         .then(function(data){
           OMDbMovies = data;
           OMDbMovies.Search.forEach(function(movie) {
             OMDbIDs.push(movie.imdbID)
           })
           console.log(OMDbIDs);
           $('#title').val("");
           console.log("first call to OMDB", OMDbMovies);
           OMDbIDs.forEach(function(id, index){
             for (let movieOption in fbData) {
               if (fbData[movieOption].imdbID === id ) {
                 OMDbIDs.splice(index, 1);
                 console.log('Match Found', id)
                 finalListOfMovies[movieOption] = fbData[movieOption]
                 console.log(finalListOfMovies);
               }
             }
           })
           OMDbIDs.forEach(function(ids, index) {
             db.getMovieByID(ids)
             .then(function(data) {
               finalListOfMovies[index] = data;
               console.log(finalListOfMovies)
             })
           })
           console.log(OMDbIDs)
      })
      // Call OMDb for similar search results on title
    // Compare OMDb and Firebase results

    // Call OMDb with IMDb IDs for actors
    // Print only unique results, with Firebase results taking priority
    });
  }
});

$(document).on('click', '.findMovies', showFindMovies);

function showFindMovies() {
    template.showFindMovie();
}

// SAVE MOVIE FUNCTIONALITY
$(document).on('click', ".addMovie", function() {
    saveMovie(false);
});
$(document).on('click', ".watchedMovie", function() {
    saveMovie(true);
});

// function saveMovie(bool) {
//     OMDbMovies.watched = bool;
//     OMDbMovies.rating = 0;
//     db.saveMovie(OMDbMovies)
//         .then(function(data) {
//             console.log(data);
//             $('.content').html("");
//         });
// }

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

// STAR HOVER FUNCTIONALITY

$(document).on({
  mouseenter: starHoverOn,
  mouseleave: starHoverOff
},'i');

function starHoverOn(evt) {
  let $hoverStar = $(evt.currentTarget);
  $hoverStar.addClass('current-star hover-star');
  $hoverStar.siblings().addClass('hover-star');
  $('.current-star ~ i').removeClass('hover-star').addClass('black-star');
}

function starHoverOff(evt) {
  let $hoverStar = $(evt.currentTarget);
  $hoverStar.removeClass('current-star hover-star');
  $hoverStar.siblings().removeClass('hover-star');
  $hoverStar.siblings().removeClass('black-star');
}

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


function reloadProfile() {
    db.getSavedMovies()
        .then(function(data) {
            console.log("movie data", data);
            template.showProfile(data);
        });
}
