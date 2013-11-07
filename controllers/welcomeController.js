
module.exports = function() {
	var slate = require('./services/slate');
	var app = {};
	//var userService = require('../services/userService');
	//var accountsDao = require('../daos/accountsDao');

	app.welcome = function(req, res, model){
		slate.render('welcome.ejs', model, function(data){
			res.send(data);
		});
	};
	return app;
}();
