"use strict";

let firebase = require('firebase/app');

function searchOMDB(title) {
  title = title.replace(' ','+');
  return new Promise(function(resolve,reject){
    $.ajax({
      url: `http://www.omdbapi.com/?type=movie&s=${title}`,
      method: 'GET'
    }).done(function(data){
      console.log(data);
      resolve(data);
    }).fail(function(error){
      reject(error);
    });
  });
}

// GET Movie By ID
function getMovieByID(id) {
  return new Promise(function(resolve,reject){
    $.ajax({
      url: `http://www.omdbapi.com/?type=movie&i=${id}`,
      method: 'GET'
    }).done(function(data){
      console.log(data);
      resolve(data);
    }).fail(function(error){
      reject(error);
    });
  });
}



// Unique Movie Search


function saveMovie(currentMovie) {
  let userId = firebase.auth().currentUser.uid;
  return firebase.database().ref('users/' + userId).push(currentMovie);
}

function getSavedMovies() {
  let userId = firebase.auth().currentUser.uid;
  return firebase.database().ref('users/' + userId)
    .once('value')
    .then(function(snapshot) {
    var data = snapshot.val();
    return data;
  });
}

function deleteMovie(key) {
  let userId = firebase.auth().currentUser.uid;
  return firebase.database().ref('users/' + userId + "/" + key).remove();
}

function updateMovie (movieId, property){
  let userId = firebase.auth().currentUser.uid;
  return new Promise(function(resolve,reject){
    $.ajax({
      url: `https://reel-good-movie-history.firebaseio.com/users/${userId}/${movieId}.json`,
      method: 'PATCH',
      data: JSON.stringify(property),
      dataType: "json"
    }).done(function(movie){
      console.log(movie);
      resolve(movie);
    }).fail(function(error){
      reject(error);
    });
  });
}


module.exports = {searchOMDB, saveMovie, getSavedMovies, deleteMovie, updateMovie, getMovieByID};
