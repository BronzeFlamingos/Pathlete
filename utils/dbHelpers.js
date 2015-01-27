var db = require('./db.js');
var request = require('request');

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
  getUserStats: function (req) {
    // var oath = {
    //   callbackURL: '/auth/fitbit/callback',
    //   token: user.token,
    //   tokenSecret: user.tokenSecret
    // };
    console.log('req.session!!!!!!!!!!!!!!!!!', req.session);
    request.get({url: "https://api.fitbit.com/1/user/-/activities/date/2015-01-23.json"},
      function (err, res, body) {
        if (err) {
          console.log('error occurred');
        }
      console.log('this is body', body);
    });
  },
  addUserStats: function () {

  }


};