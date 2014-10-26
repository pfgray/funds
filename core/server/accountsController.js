
module.exports = function() {
		var slate = require('./services/slate');
		var userDao = require('./daos/userDao');
		var app = {};
		var userService = require('./services/userService');
		var accountsDao = require('./daos/accountsDao');

		var accountValidator = {
				validate:function(account, user, callback){
						var errors = {};
						if(!account.name || account.name === ''){
								errors.name = {field:'name',message:'Account name cannot be blank!'};
						}
						if(!account.type || account.type ===''){
								errors.name = {field:'type',message:'Type must be specified'};
						}
						userDao.getAccountsForUserId(user._id, function(rows){
								for(var i=1; i<rows.length; i++){
										if(rows[i].name === account.name){
												errors.name =  {field:'name',message:'Account with that name already exists'};
										}
								}
								callback(null, errors);
						});
				}
		};

		app.list = function(req, res, model){
				userDao.getAccountsForUserId(req.session.user._id, function(rows){
						accountsDao.getSharedAccounts(req.session.user._id, function(err, shared_accounts){
								model.shared_accounts = shared_accounts;
								model.accounts = new Array();
								for(var i=1; i<rows.length; i++){
										model.accounts.push(rows[i]);
								}
								res.json(model.aaccounts);
						});
				});
		};

		app.setupAccount = function(req, res, model){
				model.account = {
					  name:req.body.name
				};
				slate.render('setup_account.ejs', model, function(data){
						res.send(data);
				});
		};

		app.finalize = function(req, res, model){
				var account = {
						name:req.body.name,
						type:req.body.type,
						owner:req.session.user._id
				}
				model.account = account;
				accountValidator.validate(account, req.session.user, function(err, errors){
						if(!err && Object.keys(errors).length < 1){
								accountsDao.insert(account, function(err, body){
										if(!err){
												res.redirect(303, '/accounts');
												return;
										}else{
												slate.render('setup_account.ejs', model, function(data){
														res.send(500, data);
												});
												return;
										}
								});
						}else{
								model.errors = errors;
								slate.render('setup_account.ejs', model, function(data){
										res.send(data);
								});
								return;
						}
				});
		};

	return app;
}();
