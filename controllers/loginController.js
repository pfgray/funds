
module.exports = function() {
	var slate = require('./services/slate');
	var app = {};
	var userService = require('./services/userService');
	var userDao = require('./daos/userDao');
	var userValidator = {
		validate:function(user, callback){
			var errors = {};
			//validate that the passwords match
			if(user.password != user.confirm_password){
				errors.password = {field:"password",message:"sorry, passwords do not match"};
			}
			//validate that the email is not blank
			if(user.email === null || user.email === ''){
				errors.email = {field:"email",message:"email cannot be blank"};
			}

			//validate that the username cannot be blank
			if(user.username === null || user.username === ''){
				errors.username = {field:"email",message:"username cannot be blank"};
			}

			//validate that the username is not in use
			userDao.getUser(user.username, function(err, user){
				if(err || user != null){
					errors.username = {field:"username",message:"sorry, username is already taken!"};
				}
				callback(err, errors);
			});
		}
	};

	var loginValidator = {
		validate:function(validatedUser, callback){
			var errors = {};

			//validate that the username exists
			userDao.getUser(validatedUser.username, function(err, user){
				if(err || user == null){
					errors.username = {message:"sorry, username was not found."};
					callback(errors);
				}else{
					userService.authenticatePassword(user.username, validatedUser.password, function(passwordError, user){
						if(!passwordError){
							callback(false, user);
						}else{
							errors.password = {message:"sorry, password is incorrect."};
							callback(errors);
						}
					});
				}
			});
		}
	};

	app.loginForm = function(req, res){
		slate.render('login.ejs', {error:false}, function(data){
			res.send(data);
		});
	};

	app.login = function(req, res) {
		var loginUser = {
			username:req.body.username, 
			password:req.body.password
		};
		loginValidator.validate(loginUser, function(error, user){
			if(!error){
				console.log("authenticated correctly!" + JSON.stringify(user));
				req.session.user = user;
				res.redirect(303, '/accounts');
			}else{
				console.log("error: " + error);
				slate.render('login.ejs', {errors:error,request:req.body}, function(data){
					res.send(data);
				});
			}
		});
	};

	app.logout = function(req, res) {
		req.session.username = null;
		req.session.user = null;
		res.redirect(303, '/login');
	};

	app.setupSignup = function(req, res) {
		var model = {};
		model.signup_user = {username:req.body.username, password:req.body.password, confirm_password:null, email:null};
		slate.render('signup.ejs', model, function(data){
			res.send(data);
			return;
		});
	};

	app.signup = function(req, res) {
		var model = {};
		var user = {
			username:req.body.username, 
			password:req.body.password, 
			confirm_password:req.body.confirm_password, 
			email:req.body.email
		};
		model.signup_user = user;
		userValidator.validate(user, function(err, errors){
			if(!err && Object.keys(errors).length < 1){
				userService.createUser(req.body.username, req.body.password, req.body.email, function(err, user){
					if(!err){
						req.session.user = user;
						res.redirect(303, '/accounts');
						return;
					}else{
						console.log('error: ' + err);
						slate.render('signup.ejs', model, function(data){
							res.send(500, data);
							return;
						});
					}
				});
			}else{
				model.errors = errors;
				slate.render('signup.ejs', model, function(data){
					res.send(400, data);
					return;
				});
			}
		});
	};


	return app;
}();
