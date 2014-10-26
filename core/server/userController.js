
module.exports = function() {
	var slate = require('./services/slate');
	var userDao = require('./daos/userDao');
	var app = {};
	var userService = require('./services/userService');
	var accountsDao = require('./daos/accountsDao');

	app.list = function(req, res, model){
		userDao.getAll(function(err, rows){
			model.users = rows;
			slate.render('users/users.ejs', model, function(data){
				res.send(data);
			});
		});
	};

	return app;
}();
