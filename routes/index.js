var express = require('express');
var router = express.Router();
var request = require('request');
var User = require('../utils/fitbit.js');
var dbHelper = require('../utils/dbHelpers.js');
var passport = require('passport');
var fitbitControl = require('../utils/fitbit.js');

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});


router.get('/logout', function (req, res) {
  req.logout();
  res.redirect('/');
});

router.get('/login', function (req, res, next){
  // console.log('SESSION BEFORE LOGIN', req.session);
  res.redirect('/auth/fitbit');
});

passport.use(fitbitControl.fitbitStrategy);
// router.route('/auth/fitbit').get(passport.authenticate('fitbit', { failureRedirect: '/login' }));

router.get('/auth/fitbit', passport.authenticate('fitbit', { failureRedirect: '/login' }), function (req,res){
});

router.get('/auth/fitbit/callback', passport.authenticate('fitbit', { failureRedirect: '/login' }), function (req, res, next) {
  //this line will redirect to the proper url after we create it
  //console.log('AFTER LOGIN',req.session);
  dbHelper.getUserStats('368XCD').once('value', function (data) {
    var userdata = data.val();
    req.session.token = userdata.token;
    req.session.tokenSecret = userdata.tokenSecret;
    fitbitControl.getStats(req,res,next);
    res.redirect('/userdata');
  });
});

router.get('/userdata', function(req, res) {
  dbHelper.getUserStats('368XCD').once('value', function(data) {
      console.log('this is dataval', data.val());
      res.send(data.val());
    });
});

module.exports = router;
