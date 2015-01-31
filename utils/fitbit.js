var FitbitStrategy = require('passport-fitbit').Strategy;
var FitbitApiClient = require('fitbit-node');
var passport = require('passport');
var dbHelper =require('./dbHelpers.js');



module.exports = exports = {
  fitbitStrategy: new FitbitStrategy({
      consumerKey: process.env.CONSUMER_KEY,
      consumerSecret: process.env.CONSUMER_SECRET,
      callbackURL: '/auth/fitbit/callback',
      userAuthorizationURL:'https://www.fitbit.com/oauth/authorize'
    }, function (token, tokenSecret, profile, done) {
          dbHelper.addUser(token, tokenSecret, profile);
          done(null, profile._json.user);
          exports.getStats(profile.id, token, tokenSecret);
        }),
  getStats: function (userID, token, secret) {
    var client = new FitbitApiClient(keys.consumerKey, keys.consumerSecret);
    client.requestResource('/activities.json', 'GET', token, secret).then(function (data) {
        dbHelper.addUserStats(userID, data[0]);
      }, function (err) {
        console.log('ERROR!',err);
      });
  }
};
