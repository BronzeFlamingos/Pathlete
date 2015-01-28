var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');
var routes = require('./routes/index');
var users = require('./routes/users');
var session = require('express-session');
var keys = require('./keys.js');
var Fitbit = require('fitbit');
var FitbitApiClient = require("fitbit-node");
var passport = require('passport');
var FitbitStrategy = require('passport-fitbit').Strategy;
var dbHelper = require('./utils/dbHelpers.js');



var app = express();
app.use(cookieParser);
app.use(session({secret: 'hekdhthigib'}));

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});


<<<<<<< HEAD
// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(__dirname + '/./public'));

app.use(session({
    secret: 'jakester',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());




app.use('/', routes);
app.use('/auth/fitbit/callback', routes);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
=======
var url = '/auth/fitbit/callback';

passport.use(new FitbitStrategy({
  consumerKey: process.env.CONSUMER_KEY || keys.consumerKey,
  consumerSecret: process.env.CONSUMER_SECRET || keys.consumerSecret,
  callbackURL: url
},

function (token, tokenSecret, profile, done) {
  dbHelper.addUser(token, tokenSecret, profile, done);
}));

app.get('/logout', function (req, res) {
  req.logout();
  res.redirect('/');
});

app.get('/login', function (req, res, next){
  res.redirect('/auth/fitbit');
>>>>>>> (feat) work on fitbitStats
});

app.get('/auth/fitbit', passport.authenticate('fitbit', {failureRedirect: '/login'}), function (req,res){

});

// router.get('/auth/fitbit/callback', passport.authenticate('fitbit', { failureRedirect: '/login' }), function (req, res, next) {
  
// });

app.get('/auth/fitbit/callback', function (req, res) {
  console.log('got to the callbacks')
  var verifier = req.query.oauth_verifier
    , oauthSettings = req.session.oauth
    , client = new Fitbit(keys.consumerKey, keys.consumerSecret);

  // Request an access token
  client.getAccessToken(
      oauthSettings.requestToken
    , oauthSettings.requestTokenSecret
    , verifier
    , function (err, token, secret) {
        if (err) {
          // Take action
          return;
        }

        oauthSettings.accessToken = token;
        oauthSettings.accessTokenSecret = secret;

        res.redirect('/stats');
      }
  );
});

// Display some stats
app.get('/stats', function (req, res) {
  client = new Fitbit(
      config.keys.consumerKey
    , config.keys.consumerSecret
    , { // Now set with access tokens
          accessToken: req.session.oauth.accessToken
        , accessTokenSecret: req.session.oauth.accessTokenSecret
        , unitMeasure: 'en_GB'
      }
  );

  // Fetch todays activities
  client.getActivities(function (err, activities) {
    if (err) {
      // Take action
      return;
    }

    // `activities` is a Resource model
    res.send('Total steps today: ' + activities.steps());
  });
});















// var client = new FitbitApiClient(keys.consumerKey, keys.consumerSecret);

// var requestTokenSecrets = {};

// app.get("/login", function (req, res) {
//   client.getRequestToken().then(function (results) {
//     var token = results[0],
//       secret = results[1];
//     requestTokenSecrets[token] = secret;
//     res.redirect("http://www.fitbit.com/oauth/authorize?oauth_token=" + token);
//   }, function (error) {
//     res.send(error);
//   });
// });

// app.get("/stats", function (req, res) {
//   console.log('inside stats')
//   var token = req.query.oauth_token,
//     secret = requestTokenSecrets[token],
//     verifier = req.query.oauth_verifier;
//   client.getAccessToken(token, secret, verifier).then(function (results) {
//     var accessToken = results[0],
//       accessTokenSecret = results[1],
//       userId = results[2].encoded_user_id;
//     return client.requestResource("/profile.json", "GET", accessToken, accessTokenSecret).then(function (results) {
//       var response = results[0];
//       res.send(response);
//     });
//   }, function (error) {
//     res.send(error);
//   });
// });


// var app = express();

// // view engine setup
// // app.set('views', path.join(__dirname, 'views'));
// // app.set('view engine', 'jade');

// // uncomment after placing your favicon in /public
// //app.use(favicon(__dirname + '/public/favicon.ico'));
// app.use(logger('dev'));
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(cookieParser());
// app.use(express.static(__dirname + '/./public'));

// app.use(session({
//     secret: 'jakester',
//     resave: false,
//     saveUninitialized: false
// }));

// // app.use('/', routes);
// // app.use('/auth/fitbit/callback', routes);
// // app.use('/users', users);

// // catch 404 and forward to error handler

// // if (!process.env.CONSUMER_KEY) {
// //   //keys.js conatains the Dev keys from fitbit
// //   //this statment makes the app work even if not being deployed
// //    var keys = require('keys.js');
// //  } 

//   // , config = require('./config/app')

// // OAuth flow
// app.get('/login', function (req, res) {
//   // Create an API client and start authentication via OAuth
//   var client = new Fitbit(keys.consumerKey, keys.consumerSecret);

//   client.getRequestToken(function (err, token, tokenSecret) {
//     if (err) {
//       // Take action
//       return;
//     }
//     console.log('getting to req.session')
//     req.session.oauth = {
//         requestToken: token
//       , requestTokenSecret: tokenSecret
//     };
//     console.log('this is url', client.authorizeUrl)
//     console.log('this is authurl', client.authorizeUrl(token))
//     console.log('type', typeof(client.authorizeUrl(token)))
//     res.redirect(client.authorizeUrl(token));
//   });
// });

// // On return from the authorization
// app.get('/stats', function (req, res) {
//   console.log('got to callback')
//   var verifier = req.query.oauth_verifier
//     , oauthSettings = req.session.oauth
//     , client = new Fitbit(keys.consumerKey, keys.consumerSecret);

//   // Request an access token
//   client.getAccessToken(
//       oauthSettings.requestToken
//     , oauthSettings.requestTokenSecret
//     , verifier
//     , function (err, token, secret) {
//         if (err) {
//           // Take action
//           return;
//         }

//         oauthSettings.accessToken = token;
//         oauthSettings.accessTokenSecret = secret;

//         res.redirect('/stats');
//       }
//   );
// });

// // Display some stats
// app.get('/stats', function (req, res) {
//   client = new Fitbit(
//       config.keys.consumerKey
//     , config.keys.consumerSecret
//     , { // Now set with access tokens
//           accessToken: req.session.oauth.accessToken
//         , accessTokenSecret: req.session.oauth.accessTokenSecret
//         , unitMeasure: 'en_GB'
//       }
//   );

//   // Fetch todays activities
//   client.getActivities(function (err, activities) {
//     if (err) {
//       // Take action
//       return;
//     }

//     // `activities` is a Resource model
//     res.send('Total steps today: ' + activities.steps());
//   });
// });
// error handlers

// development error handler
// will print stacktrace
// if (app.get('env') === 'development') {
//     app.use(function(err, req, res, next) {
//         res.status(err.status || 500);
//         res.render('error', {
//             message: err.message,
//             error: err
//         });
//     });
// }

// // production error handler
// // no stacktraces leaked to user
// app.use(function(err, req, res, next) {
//     res.status(err.status || 500);
//     res.render('error', {
//         message: err.message,
//         error: {}
//     });
// });


module.exports = app;
console.log('Express listening on: ');
