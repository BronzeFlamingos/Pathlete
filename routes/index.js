var express = require('express');
var router = express.Router();
var request = require('request');
var User = require('../utils/fitbit.js');





router.get('/logout', function (req, res) {
  req.logout();
  res.redirect('/');
});

router.get('/login', function (req, res, next){
  console.log('SESSION BEFORE LOGIN', req.session);
  res.redirect('/auth/fitbit');
});

router.get('/auth/fitbit', User.auth, function (req,res){
  console.log('HERE I AM');
});

router.get('/auth/fitbit/callback', User.auth, function (req, res, next) {
  //this line will redirect to the proper url after we create it
  //console.log('AFTER LOGIN',req.session);
  res.redirect('/');
});

module.exports = router;
