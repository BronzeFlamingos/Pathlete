var db = require('./db.js');
var request = require('request');
var helpers = require('./helpers.js');

module.exports = {
  addUser: function (token, tokenSecret, profile, done){
    var err = '';
    // console.log(profile);
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
      // done(err, profile._json.user);
    });
  },
  
  getUserStats: function (userID, callback) {
    console.log('got to user stats');
    //takes user id and querys the firebase database
    return db.child('users').child(userID);
    
  },

  addUserStats: function (userID, userStats) {
    db.child('users').child(userID).child('stats').update(JSON.parse(userStats));
  }


};