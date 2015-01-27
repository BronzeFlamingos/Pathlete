var db = require('./db.js');
var request = require('request');
var helpers = require('./helpers.js');

module.exports = {
  addUser: function (token, tokenSecret, profile, done){
    var err = '';
    console.log(profile);
    db.child('users').child(profile.id).once('value', function (data) {
      if (data.val() === null){
        var user = {};
        user.tokenSecret = tokenSecret;
        user.token = token;
        user.name = profile._json.user.fullName;
        user.strideRunning = profile._json.user.strideLengthRunning;
        user.strideWalking = profile._json.user.strideLengthWalking;
        user.units = profile._json.user.distanceUnit;
        db.child('users').child(profile.id).set(user);
      } else {
        db.child('users').child(profile.id).update({tokenSecret: tokenSecret, token: token});
      }
      done(err, profile._json.user);
    });
  },
  getUserStats: function (userID) {
    //takes user id and querys the firebase database
    var userData = {};
    db.child('users').child(userID).once('value', function (data) {
      userData = helpers.extend(userData, data);
    });
    return userData;
  },
  addUserStats: function (userID, userStats) {
    db.child('users').child(userID).update(userStats);
  }


};