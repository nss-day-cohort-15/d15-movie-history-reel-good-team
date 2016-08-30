"use strict";
// SHOW UNWATCHED OR WATCHED FILMS WITHIN PROFILE
$(document).on('click', '.showUntracked', function(evt) {
  let $activeFilter = $(evt.currentTarget);
  $activeFilter.siblings().removeClass('active-button');
  $activeFilter.addClass('active-button');
  $('.secondBread').html('Untracked');
  $('.movieDiv').show();
  $('.movieCard[saved=true]').parent('.movieDiv').hide();
});

$(document).on('click', '.showUnwatched', function(evt) {
  let $activeFilter = $(evt.currentTarget);
  $activeFilter.siblings().removeClass('active-button');
  $activeFilter.addClass('active-button');
  $('.secondBread').html('Unwatched');
  $('.movieDiv').hide();
  $('.movieCard[rating=0]').parent('.movieDiv').show();
});

$(document).on('click', '.showWatched', function(evt) {
  let $activeFilter = $(evt.currentTarget);
  $activeFilter.siblings().removeClass('active-button');
  $activeFilter.addClass('active-button');
  $('.secondBread').html('Watched')
  $('.movieDiv').hide();
  $('.movieCard[saved=true]').parent('.movieDiv').show();
  $('.movieCard[rating=0]').parent('.movieDiv').hide();
});

$(document).on('click', '.showFavorites', function(evt) {
  let $activeFilter = $(evt.currentTarget);
  $activeFilter.siblings().removeClass('active-button');
  $activeFilter.addClass('active-button');
  $('.secondBread').html('Favorites')
  $('.movieDiv').hide();
  $('.movieCard[rating=10]').parent('.movieDiv').show();
});
