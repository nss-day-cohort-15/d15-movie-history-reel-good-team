"use strict";

let firebase = require('firebase/app');

function searchOMDB(title) {
  title = title.replace(' ','+');
  return new Promise(function(resolve,reject){
    $.ajax({
      url: `http://www.omdbapi.com/?type=movie&tomatoes=true&t=${title}`,
      method: 'GET'
    }).done(function(data){
      console.log(data);
      resolve(data);
    }).fail(function(error){
      reject(error);
    });
  });
}

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


module.exports = {searchOMDB, saveMovie, getSavedMovies, deleteMovie};
