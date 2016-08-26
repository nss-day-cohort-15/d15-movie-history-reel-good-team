"use strict";

let firebase = require('firebase/app')

function searchOMDB(title) {
  title = title.replace(' ','+');
  return new Promise(function(resolve,reject){
    $.ajax({
      url: `http://www.omdbapi.com/?type=movie&tomatoes=true&t=${title}`,
      method: 'GET'
    }).done(function(data){
      console.log(this.statusText);
      resolve(data);
    }).fail(function(error){
      console.log(this.statusText);
      reject(error);
    })
  })
}

function saveMovie(currentMovie) {
  let userId = firebase.auth().currentUser.uid;
  return firebase.database().ref('users/' + userId).push(currentMovie);
}


module.exports = {searchOMDB, saveMovie};
