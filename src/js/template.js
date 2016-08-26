"use strict";

let searchMovies = require('../templates/searchResults.hbs');

function showSearchResults (searchData){
  $('.content').html(searchMovies(searchData));
}

module.exports = showSearchResults;
