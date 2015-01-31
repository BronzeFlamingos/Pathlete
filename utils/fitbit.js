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
    }, function (token, tokenSecret, profile, done) {   //after oath login call this success handler
          console.log(profile); //returns user profile 
          dbHelper.addUser(token, tokenSecret, profile);  //add user to db

          exports.getStats(profile.id, token, tokenSecret).then(function() { //this line waits for 26 to finish
            done(null, profile._json.user); //done tells the program you are done and want to go to the next step
          });
          
        }),

  getStats: function (userID, token, secret) {
    var client = new FitbitApiClient(process.env.CONSUMER_KEY, process.env.CONSUMER_SECRET);
    return client.requestResource('/activities.json', 'GET', token, secret).then(function (data) {  //creates the request to get activites json from fitbit
        dbHelper.addUserStats(userID, data[0]); //success handler for req, return the promise
      }, function (err) {
        console.log('ERROR!',err);
      });
  }
};
