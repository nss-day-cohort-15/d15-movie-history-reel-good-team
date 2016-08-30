"use strict";
// let db = require('./db-interaction'),
// template = require('./template.js');
// // SHOW UNWATCHED OR WATCHED FILMS WITHIN PROFILE
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
//   getDbMovies();
//   $('.filter').removeClass('cyan lighten-4');
//   let $activeFilter = $(evt.currentTarget);
//   $activeFilter.siblings().removeClass('active-button');
//   $activeFilter.addClass('cyan lighten-4');
//   $('.secondBread').html('Unwatched');
//   $('.movieDiv').hide();
//   $('.movieCard[rating=0]').parent('.movieDiv').show();
// });

// $(document).on('click', '.showWatched', function(evt) {
//   getDbMovies();
//   $('.filter').removeClass('cyan lighten-4');
//   let $activeFilter = $(evt.currentTarget);
//   $activeFilter.siblings().removeClass('active-button');
//   $activeFilter.addClass('cyan lighten-4');
//   $('.secondBread').html('Watched')
//   $('.movieDiv').hide();
//   $('.movieCard[saved=true]').parent('.movieDiv').show();
//   $('.movieCard[rating=0]').parent('.movieDiv').hide();
// });

// $(document).on('click', '.showFavorites', function(evt) {
//   getDbMovies();
//   $('.filter').removeClass('cyan lighten-4');
//   let $activeFilter = $(evt.currentTarget);
//   $activeFilter.siblings().removeClass('active-button');
//   $activeFilter.addClass('cyan lighten-4');
//   $('.secondBread').html('Favorites')
//   $('.movieDiv').hide();
//   $('.movieCard[rating=10]').parent('.movieDiv').show();
// });

// function getDbMovies (){
//  db.getSavedMovies()
//   .then(function(data){
//     console.log("what is the data?", data);
//     template.showProfile(data);
//     checkNumberOfMovies();
//   });
// }
