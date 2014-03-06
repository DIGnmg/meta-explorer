'use strict'
/**
 * Module dependencies.
 */

var express = require('express'),
  routes = require('./routes'),
  http = require('http'),
  path = require('path'),
  passport = require('passport'),
  request = require('request'),
  util = require('util'),
  mongoose = require('mongoose');

var app = express();

var configDB = require('./config/db.js');
mongoose.connect(configDB.url);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
  // yay!
});

require('./config/passport')(passport);

// configure Express
app.configure(function() {
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.engine('html', require('ejs').renderFile);
  app.use(express.cookieParser('S3CRE7'));
  app.use(express.cookieSession({
  key: 'appSess',
  secret: 'SUPERsekret'
}));

  app.use(express.bodyParser());
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.methodOverride());

  app.use(passport.initialize());
  app.use(passport.session());

  app.use(app.router);

  //app.use(express.static(__dirname + '/public'));
});

var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';

if (env !== 'production') {
  // development only
  console.log('development');
  console.log(__dirname);
  app.set('views', __dirname + '/app');
  app.use(express.static(path.join(__dirname, 'app')));
  app.use(express.errorHandler());
}
else {
  // production
  console.log('production');
  app.set('views', __dirname + '/dist');
  //app.use(express.static(path.join(__dirname, 'dist')));
  app.use(express.static(__dirname + 'dist'));
}

app.get('/', routes.index);
//route for location recent media
app.get('/location/:geo', routes.SearchLocation);

//route tag searching
app.get('/tag', routes.SearchTags);

//routes for user calls
app.get('/user',ensureAuthenticated, routes.UserId);
app.get('/usersearch',ensureAuthenticated, routes.SearchUser);

// route for swtiching
app.get('/test',ensureAuthenticated, routes.testCall);

// route for swtiching
app.get('/paging',ensureAuthenticated, routes.Paging);

// app.get('/', function(req, res){
//   res.render('index', { user: req.user });
// });

app.get('/account', ensureAuthenticated, function(req, res){
  console.log('account page');
  res.render('account', { user: req.user });
});

app.get('/login', function(req, res){
  res.render('login', { user: req.user });
});

// GET /auth/instagram
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  The first step in Instagram authentication will involve
//   redirecting the user to instagram.com.  After authorization, Instagram
//   will redirect the user back to this application at /auth/instagram/callback
app.get('/auth/instagram',
  passport.authenticate('instagram'),
  function(req, res){
    // The request will be redirected to Instagram for authentication, so this
    // function will not be called.
  });

// GET /auth/instagram/callback
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  If authentication fails, the user will be redirected back to the
//   login page.  Otherwise, the primary route function function will be called,
//   which, in this example, will redirect the user to the home page.
app.get('/auth/instagram/callback',
  passport.authenticate('instagram', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/');
  });

app.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

// Simple route middleware to ensure user is authenticated.
//   Use this route middleware on any resource that needs to be protected.  If
//   the request is authenticated (typically via a persistent login session),
//   the request will proceed.  Otherwise, the user will be redirected to the
//   login page.
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/', routes.index)
}

module.exports = app;

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
  console.log(env);
});
