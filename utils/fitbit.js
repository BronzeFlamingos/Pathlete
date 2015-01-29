var FitbitStrategy = require('passport-fitbit').Strategy;
var FitbitApiClient = require('fitbit-node');
var passport = require('passport');
var db = require('./db.js');
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
          dbHelper.addUser(token, tokenSecret, profile, done);
        }),
  getStats: function (req, res, next) {
    var client = new FitbitApiClient(keys.consumerKey, keys.consumerSecret);
    dbHelper.getUserStats('368XCD').once('value', function (data) {
      var user = data.val();
      client.requestResource('/activities.json', 'GET', user.token, user.tokenSecret).then(function (data) {
        dbHelper.addUserStats('368XCD', data[0]);
      });
    });
  },
  fetch: function (data) {
    console.log('FETCH', data);
  }
};