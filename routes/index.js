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

router.get('/auth/fitbit', User.auth, function (req,res){});

router.get('/auth/fitbit/callback', User.auth, function (req, res, next) {
  //this line will redirect to the proper url after we create it
  //console.log('AFTER LOGIN',req.session);
  res.redirect('/');
});

// router.get('/stats', function(req, res) {
//    request(
//     "https://api.fitbit.com/1/user/-/activities/date/2015-01-23.json", 
//       function(err, response, body) {
//         if (err) {
//           console.log('error occurred')
//         }
//       console.log('this is body', body)
//       res.send(body);
//     });
//   });

module.exports = router;
