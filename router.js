var Auth = require('./controllers/authentication');
var PassportServicer = require('./services/passport');
var passport = require('passport');

//this will be used as middleware for the routes that require authentication
var requireAuth = passport.authenticate('jwt', {session: false});

module.exports = function(app) {	
	app.get('/', requireAuth, function(request, response){
		response.send({message: 'hi there auth passed!'});
	});

	app.post('/signup', Auth.signup);
}