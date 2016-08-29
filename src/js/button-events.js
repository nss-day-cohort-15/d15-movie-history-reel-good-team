// SHOW UNWATCHED OR WATCHED FILMS WITHIN PROFILE
$(document).on('click', '.showUntracked', function(evt) {
  let $activeFilter = $(evt.currentTarget);
  $activeFilter.siblings().removeClass('active-button');
  $activeFilter.addClass('active-button');
  $('.secondBread').html('Untracked');
  $('.movieCard').show();
  $('.movieCard[saved=true]').hide();
});

$(document).on('click', '.showUnwatched', function(evt) {
  let $activeFilter = $(evt.currentTarget);
  $activeFilter.siblings().removeClass('active-button');
  $activeFilter.addClass('active-button');
  $('.secondBread').html('Unwatched');
  $('.movieCard').hide();
  $('.movieCard[rating=0]').show();
});

$(document).on('click', '.showWatched', function(evt) {
  let $activeFilter = $(evt.currentTarget);
  $activeFilter.siblings().removeClass('active-button');
  $activeFilter.addClass('active-button');
  $('.secondBread').html('Watched')
  $('.movieCard').hide();
  $('.movieCard[saved=true]').show();
  $('.movieCard[rating=0]').hide();
});

$(document).on('click', '.showFavorites', function(evt) {
  let $activeFilter = $(evt.currentTarget);
  $activeFilter.siblings().removeClass('active-button');
  $activeFilter.addClass('active-button');
  $('.secondBread').html('Favorites')
  $('.movieCard').hide();
  $('.movieCard[rating=10]').show();
});
