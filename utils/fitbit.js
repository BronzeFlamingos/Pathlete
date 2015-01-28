var FitbitStrategy = require('passport-fitbit').Strategy;
var passport = require('passport');
var dbHelper = require('./dbHelpers.js')

if (!process.env.CONSUMER_KEY) {
  //keys.js conatains the Dev keys from fitbit
  //this statment makes the app work even if not being deployed
   var keys = require('../keys.js');
 } 

passport.serializeUser(function(user, done) {
  console.log('SERIALIZE: ', user);
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  console.log('DESERIALIZE: ', obj);
  done(null, obj);
});

var url = '/auth/fitbit/callback';

passport.use(new FitbitStrategy({
  consumerKey: process.env.CONSUMER_KEY || keys.consumerKey,
  consumerSecret: process.env.CONSUMER_SECRET || keys.consumerSecret,
  callbackURL: url
},
function (token, tokenSecret, profile, done) {
  console('TRYING TO AUTH');
  dbHelper.addUser(token, tokenSecret, profile, done);
  dbHelper.getUserStats(profile.id);
}));

module.exports = {
  auth: function (req, res, next) {
    console.log(passport.authenticate);
   // passport.authenticate('fitbit', passport.authenticate('fitbit', { failureRedirect: '/login' }));
    
  },
  fetch: function () {}
};