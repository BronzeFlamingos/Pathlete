var express = require('express');
var router = express.Router();
var passport = require('passport');
var FitbitStrategy = require('passport-fitbit').Strategy;
var keys = require('../keys.js');

var url = 'http://localhost:1337/auth/fitbit/callback';

passport.use(new FitbitStrategy({
  consumerKey: keys.consumerKey,
  consumerSecret: keys.consumerSecret,
  callbackURL: url
},
function (token, tokenSecret, profile, done) {
  console.log('token: ', token);
  console.log('tokenSecret', tokenSecret);
  console.log('profile', profile);
  console.log('done:', done);
}
    
));


/* GET home page. */
router.get('/auth/fitbit/callback', passport.authenticate('fitbit', { failureRedirect: '/login' }), function (req, res, next) {

  console.log('req: ', req);
  res.render('index', { title: 'Express' });
});

module.exports = router;
