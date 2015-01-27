var db = require('./db.js');
<<<<<<< HEAD
var request = require('request');
var helpers = require('./helpers.js');
=======
var request = require('request')
>>>>>>> (feat) working on fitbitStats

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
<<<<<<< HEAD
  getUserStats: function (userID) {
    //takes user id and querys the firebase database
    var userData = {};
    db.child('users').child(userID).once('value', function (data) {
      userData = helpers.extend(userData, data);
=======

  getUserStats: function (token, id) {
      var headers = { 
          oauth_consumer_key:"88258f1d94634f7bab6e9b34d607c5d6",
          oauth_token: token,
          oauth_signature_method: "HMAC-SHA1",
          oauth_timestamp: Date.now(),
          oauth_nonce: "515379974",
          oauth_signature: "Gf5NUq1Pvg3DrtxHJyVaMXq4Foo%3D",
          oauth_version: "1.0"
        }
      }
    }
    var options = {
      url: "https://api.fitbit.com/1/user/" + id + "/activities/date/2015-01-23.json",
      headers: headers

    }
    request(options,
      function(err, response, body) {
        if (err) {
          console.log('error occurred');
        }
      console.log('this is body', body);
>>>>>>> (feat) working on fitbitStats
    });
    return userData;
  },
  addUserStats: function (userID, userStats) {
    db.child('users').child(userID).update(userStats);
  }


};