var express = require('express');
var router = express.Router();
var passport = require('passport');
var FitbitStrategy = require('passport-fitbit').Strategy;
var keys = require('../keys.js');
var db = require('../utils/db.js');
var dbHelper = require('../utils/dbHelpers.js');


passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});


var url = 'http://localhost:1337/auth/fitbit/callback';

passport.use(new FitbitStrategy({
  consumerKey: keys.consumerKey,
  consumerSecret: keys.consumerSecret,
  callbackURL: url
},
function (token, tokenSecret, profile, done) {
  dbHelper.addUser(token, tokenSecret, profile, done);
  
}));

router.get('/logout', function (req, res) {
  req.logout();
  res.redirect('/');
});
router.get('/login', function (req, res, next){
  res.redirect('/auth/fitbit');
});
router.get('/auth/fitbit', passport.authenticate('fitbit', {failureRedirect: '/login'}), function (req,res){});

router.get('/auth/fitbit/callback', passport.authenticate('fitbit', { failureRedirect: '/login' }), function (req, res, next) {
});

module.exports = router;
