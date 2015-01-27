var db = require('./db.js');


module.exports = {
  addUser: function (token, tokenSecret, profile, done){
    var err = '';
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
    this.getUserStats(user);
  },
  getUserStats: function (user) {
    var oath = {
      callbackURL: 'http://localhost:1337/auth/fitbit/callback',
      token: user.token,
      tokenSecret: user.tokenSecret
    }
    request.get({url: "https://api.fitbit.com/1/user/" + user.id + "/activities/date/2015-01-23.json",
      oath: oath},
      function(err, response, body) {
        if (err) {
          console.log('error occurred')
        }
      console.log('this is body', body)
    })
  },
  addUserStats: function () {

  }


};