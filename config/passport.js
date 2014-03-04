var InstagramStrategy = require('passport-instagram').Strategy;
var IGUsers = require('../models/users');

module.exports = function(passport) {

	// Setting up client ids
	var INSTAGRAM_CLIENT_ID = "6c915f96b07a44c381fb5c6bfe5e40ed"
	var INSTAGRAM_CLIENT_SECRET = "87a6e3ce43434084849a748b25f72d06";
	
	// Passport session setup.
	//   To support persistent login sessions, Passport needs to be able to
	//   serialize users into and deserialize users out of the session.  Typically,
	//   this will be as simple as storing the user ID when serializing, and finding
	//   the user by ID when deserializing.  However, since this example does not
	//   have a database of user records, the complete Instagram profile is
	//   serialized and deserialized.
	passport.serializeUser(function(user, done) {
	  console.log(user);
	  done(null, user);
	});

	passport.deserializeUser(function(obj, done) {
	  done(null, obj);
	});

	// Use the InstagramStrategy within Passport.
	//   Strategies in Passport require a `verify` function, which accept
	//   credentials (in this case, an accessToken, refreshToken, and Instagram
	//   profile), and invoke a callback with a user object.
	passport.use(new InstagramStrategy({
		clientID: INSTAGRAM_CLIENT_ID,
		clientSecret: INSTAGRAM_CLIENT_SECRET,
		callbackURL: "http://localhost:3000/auth/instagram/callback"
	  },
	  function(accessToken, refreshToken, profile, done) {

		// asynchronous verification, for effect...
		console.log(accessToken);
		process.nextTick(function () {

		  IGUsers.findOne({igId : profile.id}, function(err, oldUser){
			  if(oldUser){
				userToken = oldUser.token;
				console.log(userToken);
				  //accessToken = oldUser.token;
				  done(null,oldUser);
			  } else{
				  var newUser = new IGUsers({
					  igId: profile.id,
					  username: profile.username,
					  provider: profile.provider,
					  token: accessToken
				  }).save(function(err,newUser){
					  if(err) throw err;
					  console.log(newUser);
					  done(null, newUser);
				  });
			  }
		  });

		});
	  }
	));

};