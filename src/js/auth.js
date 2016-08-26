"use strict";

let firebase = require("./fbconfig");

var provider = new firebase.auth.GoogleAuthProvider();

function loginWithGoogle() {
  return firebase.auth().signInWithPopup(provider);
}

module.exports = loginWithGoogle;
