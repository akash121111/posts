const jwt = require('jsonwebtoken');
// const confiq = require('../config/config').get(process.env.NODE_ENV);
const bcrypt = require('bcrypt');
const SALT = 8;

var mongoose = require('mongoose');

const userSchema = mongoose.Schema({
	firstName: {
		type: String,
		default: null,
		maxlength: 100
	},
	lastName: {
		type: String,
		default: null,
		maxlength: 100
	},
	email: {
		type: String,
		required: false,
		default: null,
		unique: false,
		trim: true
	},
	profilePicture: {
		url: { type: String, default: 'https://ik.imagekit.io/95aolvfy5yv/index_ZTb0auuWK.png' },
		fileId: String
	},
	phone: {
		type: String,
		required: true,
		minlength: 10,
		unique: true
	},
	password: {
		type: String,
		default: null,
		required: true
	}
});

userSchema.pre('save', function(next) {
	var user = this;

	// only hash the password if it has been modified (or is new)
	if (!user.isModified('password')) return next();

	// generate a salt
	bcrypt.genSalt(SALT, function(err, salt) {
		if (err) return next(err);

		// hash the password using our new salt
		bcrypt.hash(user.password, salt, function(err, hash) {
			if (err) return next(err);
			// override the cleartext password with the hashed one
			user.password = hash;
			next();
		});
	});
});

userSchema.methods.comparepassword = function(password, cb) {
	bcrypt.compare(password, this.password, function(err, isMatch) {
		if (err) return cb(next);
		cb(null, isMatch);
	});
};

// generate token

userSchema.methods.generateToken = function(cb) {
	var user = this;
	var token = jwt.sign(user._id.toHexString(), confiq.SECRET);

	user.token = token;
	user.save(function(err, user) {
		if (err) return cb(err);
		cb(null, user);
	});
};

// find by token
userSchema.statics.findByToken = function(token, cb) {
	var user = this;

	jwt.verify(token, confiq.SECRET, function(err, decode) {
		user.findOne({ _id: decode, token: token }, function(err, user) {
			if (err) return cb(err);
			cb(null, user);
		});
	});
};

//delete token

userSchema.methods.deleteToken = function(token, cb) {
	var user = this;

	user.update({ $unset: { token: 1 } }, function(err, user) {
		if (err) return cb(err);
		cb(null, user);
	});
};

module.exports = mongoose.model('User', userSchema);
