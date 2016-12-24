var passport = require('passport');
var User = require('../models/user');
var config = require('../config');
var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;

//Setup options for JWT Strategy
var jwtOptions = {
	//tell passport where to find token - in header 'authorization'
	jwtFromRequest: ExtractJwt.fromHeader('authorization'),
	//what the secret? - to decode and get id
	secretOrKey: config.secret
};

//Create JWT Strategy
var jwtLogin = new JwtStrategy(jwtOptions, function(payload, done){
	//the callback is called when user attemts to login with jwt

	//check if user Id in the payload exists in the DB
	User.findById(payload.sub, function(error, user){
		//if no - call 'done' without user object
		if(error){return done(error, false);}
		
		
		if(user){
			//if yes - call 'done' with the user	
			done(null, user);
		}else{
			//if no - call 'done' without user object
			done(null,false);
		}
	})
})

//Tell passport to use JWT Strategy
passport.use(jwtLogin);

