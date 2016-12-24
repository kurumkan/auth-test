var Auth = require('./controllers/authentication');

module.exports = function(app) {

	app.post('/signup', Auth.signup);

}