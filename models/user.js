var mongoose = require('mongoose');
var bcrypt=require('bcrypt-nodejs');


var Schema = mongoose.Schema;
mongoose.connect('mongodb://localhost:auth/auth');

var userSchema = new Schema({
	email: {type: String, unique:true, lowercase: true},
	password: String
});

//before saving (presave) - enctypt password
userSchema.pre('save', function(next){
	var user = this;

	//generate salt
	bcrypt.genSalt(10, function(error, salt){
		if(error)
			return next(error);
		
		//hash the password via bcrypt
		bcrypt.hash(user.password, salt, null, function(error, hash){
			if(error)
				return next(error);

			user.password=hash;
			next();
		})
	})
})

var ModelClass = mongoose.model('user', userSchema);

module.exports = ModelClass;
