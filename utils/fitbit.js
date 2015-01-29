var FitbitStrategy = require('passport-fitbit').Strategy;
var FitbitApiClient = require('fitbit-node');
var passport = require('passport');

var dbHelper =require('./dbHelpers.js');
var promise = require('bluebird');
var Q = require('q');

if (!process.env.CONSUMER_KEY) {
  //keys.js conatains the Dev keys from fitbit
  //this statment makes the app work even if not being deployed
   var keys = require('../keys.js');
 } 




var url = '/auth/fitbit/callback';




module.exports = exports = {
  fitbitStrategy: new FitbitStrategy({
      consumerKey: process.env.CONSUMER_KEY || keys.consumerKey,
      consumerSecret: process.env.CONSUMER_SECRET || keys.consumerSecret,
      callbackURL: url
    }, function (token, tokenSecret, profile, done) {
          console.log('TRYING TO AUTHQ!!!');
          dbHelper.addUser(token, tokenSecret, profile, done);
        }),
  getStats: function (req, res, next) {
    var client = new FitbitApiClient(keys.consumerKey, keys.consumerSecret);
    console.log('in fitbit.auth!!!!!!!');
    
      dbHelper.getUserStats('368XCD').on('value', function (data) {
        var user = data.val();
        console.log(data.val());
        // exports.fetch(user);
        client.requestResource('/activities.json', 'GET', user.token, user.tokenSecret).then(function (data) {
          console.log('FITBIT YOU ASSHOLE', data[0]);
        });
        // setTimeout(function () {
        //   console.log(JSON.stringify(info));
        // }, 15000);
      });
    
    // console.log(user.val());
    
    // exports.fetch(client.requestResource('/1/user/368XCD/activities/date/2015-01-27.json', 'GET', user.token, user.tokenSecret));
    // console.log(user.token);
    
  },
  fetch: function (data) {
    console.log('FETCH', data);
  }
};