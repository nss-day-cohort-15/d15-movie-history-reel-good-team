"use strict";

let firebase = require("./fbconfig");

var provider = new firebase.auth.GoogleAuthProvider();

function loginWithGoogle() {
  return firebase.auth().signInWithPopup(provider);
}

function logoutWithGoogle() {
  return firebase.auth().signOut();
}

module.exports = {loginWithGoogle, logoutWithGoogle};
