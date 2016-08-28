"use strict";

let searchMovies = require('./../templates/findMovies.hbs'),
    showSavedMovies = require('./../templates/savedMovies.hbs');
var Handlebars = require('hbsfy/runtime');

Handlebars.registerPartial('searchResults', require('./../templates/partials/searchResults.hbs'));

Handlebars.registerHelper('activateStars',function(rating, index, options){
  if (rating >= index) {
    return 'active-star'
  }
})

function showSearchResults (searchData){
  $('.display').html(searchMovies(searchData));
}

function showFindMovie (){
  $('.display').html(searchMovies);
}

function showProfile(data) {
  $('.display').html(showSavedMovies(data));
}

module.exports = {showSearchResults, showFindMovie, showProfile};
