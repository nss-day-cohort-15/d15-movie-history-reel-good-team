"use strict";

let fbKey = require("./fbkeys"),
    fbData = fbKey(),
    firebase = require("firebase/app");

require("firebase/auth");
require("firebase/database")

var config = {
  apiKey: fbData.key,
  authDomain: fbData.authUrl,
  databaseURL: fbData.databaseUrl
};

firebase.initializeApp(config);

module.exports = firebase;
