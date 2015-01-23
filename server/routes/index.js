var express = require('express');
var router = express.Router();
var passport = require('passport');
var FitbitStrategy = require('passport-fitbit').Strategy;
var keys = require('../keys.js');
var db = require('../public/javascripts/db.js');


var db = require('../public/javascripts/db.js');


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

  var err = '';
  db.child('users').child(profile.id).once('value', function (data) {
    if (data.val() === null){
      err = 'user not in DB!';
    }
    db.child('users').update(profile.id);
    db.child('users').child(profile.id).set(profile._json.user);
  });
  done(err, profile._json.user);
  next();


}
    
));


/* GET home page. */
router.get('/login', function (req, res, next){
  req.redirect('auth/fitbit');
});
router.get('/auth/fitbit', passport.authenticate('fitbit', {failureRedirect: '/login'}), function (req,res){});

router.get('/auth/fitbit/callback', passport.authenticate('fitbit', { failureRedirect: '/login' }), function (req, res, next) {

 
  res.render('index', { title: 'Express' });
});

module.exports = router;
