"use strict";

let searchMovies = require('./../templates/findMovies.hbs'),
    showSavedMovies = require('./../templates/savedMovies.hbs'),
    Handlebars = require('hbsfy/runtime');

Handlebars.registerPartial('searchResults', require('./../templates/partials/searchResults.hbs'));

Handlebars.registerHelper('activateStars',function(rating, index){
  if (rating >= index) {
    return 'active-star';
  }
});

function showSearchResults (searchData){
  $('.display').html(searchMovies(searchData));
  console.log('This works')

}

function showFindMovie (){
  $('.display').html(searchMovies);
  console.log('This works')

}

function showProfile(data) {
  console.log(data);
  console.log('This works')
  $('.display').html(showSavedMovies(data));

}

module.exports = {showSearchResults, showFindMovie, showProfile};
