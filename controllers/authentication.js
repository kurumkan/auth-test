var jwt = require('jwt-simple');

var config = require('../config');
var User = require('../models/user');

function getToken(user){
	var timestamp = new Date().getTime();
	//sub-token's subject
	//iat-issued at time
	return jwt.encode({ sub: user.id, iat: timestamp }, config.secret);
}


exports.signup = function(request, response, next){

	var {email, password} = request.body;
	
	if(!email || !password)
		response.status(422).json({error: 'You must provide email and password'});
	
	//see if a user exists
	User.findOne({email: email}, function(error, user){
		if(error)
			return next(error);
		if(user){
			//if a user exists - return error
			//unprocessable entity
			return response.status(422).send({error:'Email is in use'});
		}
		else{

			//if a user doesnt exist - create one db entry
			var newUser = new User({
				email,
				password
			});
			newUser.save(function(error){
				if(error)
					return next(error);
				else
					response.json({token: getToken(newUser)});
			});
			
		}
	});	
}


exports.signin = function(request, response, next){
	//At this stage user has authorized their password and email
	//we need give a token!

	var user = request.user;
	response.send({token: getToken(user)})
}