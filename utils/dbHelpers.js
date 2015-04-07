var db = require('./db.js');
var request = require('request');
var Q = require('q');



module.exports = {
  addUser: function(profile){
    console.log('adding user')
    var deferred = Q.defer();
    var user = {};
      user.id = profile.id;
      user.name = profile._json.user.fullName;
      user.strideRunning = profile._json.user.strideLengthRunning;
      user.strideWalking = profile._json.user.strideLengthWalking;
      user.units = profile._json.user.distanceUnit;
      db.child('users').child(profile.id).set(user, function(err){
        if (err === null){
          deferred.resolve(user);
        } else {
          deferred.reject(err);
        }
        return deferred.promise;
      });
  },
  findUser: function (profile){
    var deferred = Q.defer();
    db.child('users').child(profile.id).once('value', function (data) {
      deferred.resolve(data.val());
    },function(err){
      deferred.reject(err);
    });
    return deferred.promise;
  },

  getUserStats: function (userID, callback) {
    //take user id and query the firebase database
    return db.child('users').child(userID);

  },

  //add user activity, such as stairs and steps to their profile in the db
  addUserStats: function (userID, userStats) {
    db.child('users').child(userID).child('stats').update(JSON.parse(userStats));
  }

};
