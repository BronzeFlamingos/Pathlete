var FitbitStrategy = require('passport-fitbit').Strategy;
var FitbitApiClient = require('fitbit-node');
var passport = require('passport');
var dbHelper =require('./dbHelpers.js');

module.exports = exports = {
  fitbitStrategy: new FitbitStrategy({
      consumerKey: process.env.CONSUMER_KEY,
      consumerSecret: process.env.CONSUMER_SECRET,
      callbackURL: '/auth/fitbit/callback',
      userAuthorizationURL: 'https://www.fitbit.com/oauth/authenticate'
    }, function (token, tokenSecret, profile, done) {
          dbHelper.findUser(profile).then(function(data){
            if (data === null){
              return dbHelper.addUser(profile)
            } else{
              return data
            }

          }).then(function(data){

            exports.getStats(profile.id, token, tokenSecret).then(function() {

            });
          }).done(function(){
            done(null, profile._json.user);
          },function(){
            done(null, profile._json.user);
          },function(){
            done(null, profile._json.user);
          });
        }),

  getStats: function (userID, token, secret) {
    var client = new FitbitApiClient(process.env.CONSUMER_KEY, process.env.CONSUMER_SECRET);
    //creates the request to get activites json from fitbit
    return client.requestResource('/activities.json', 'GET', token, secret).then(function (data) {
        //success handler for req, return the promise
        dbHelper.addUserStats(userID, data[0]);
      }, function (err) {
        console.log('ERROR!',err);
      });
  }
};
