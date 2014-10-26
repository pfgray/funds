
module.exports = function() {
    var slate = require('./services/slate');
    var app = {};
    var transactionDao = require('./daos/transactionDao');

  	app.list = function(req, res, model){
    		var date = new Date(new Date().getFullYear(), new Date().getMonth());
    		transactionDao.getTransactionsForAcountForDate(req.params.account,date, function(err, rows){
      			model.transactions = rows;
      			transactionDao.getTotalForMonth(req.params.account, function(total){
      				  transactionDao.getTransactionPercentsForAcountForDate(req.params.account, new Date(), function(err, tags){
          					model.total = parseInt(total*100)/100;
          					model.username = req.session.username;
          					model.account = req.params.account;
          					model.tags = tags;
                    res.json(model.transactions);
      			    });
      			});
    		});
  	};

	app.viewAdd = function(req, res, model) {
		model.username = req.session.username;
		model.account = req.params.account;
		slate.render('addTransaction.ejs', model, function(data){
            res.send(data);
        });
	};
	app.add = function(req, res) {

		//how to check that a user has access to add transactions to this account?
		req.body.account = req.params.account;

		if(req.body.negative == "true"){
			req.body.amount = "-" + req.body.amount;
		}
		delete req.body.negative;
		req.body.amount = parseFloat(req.body.amount);
		if(isNaN(req.body.amount)){
			res.send("Error");
			return;
		}

		var tag_list = req.body.tags.split(",");
		req.body.tags = [];
		tag_list.forEach(function(tag){
			if(tag.trim() !== ''){
				req.body.tags.push(tag);
			}
		});

		req.body.timestamp = Date.now();
		req.body.user = req.session.user._id;

		transactionDao.addTransaction(req.body);

		res.redirect(303, '/accounts/'+req.body.account+'/transactions' );
	};
	app.viewTag = function(req, res, model){
		transactionDao.getAllForMonthTag(req.query.tag, function(rows){
			model.transactions = rows;
			model.tag = req.query.tag;
			model.total = 0;
			slate.render('tag.ejs', model, function(data){
	            res.send(data);
	        });
		});
	};

	app.delete = function(req, res, model){

		console.log("****getting delete request from:", JSON.stringify(req.session.user));
		console.log("****	for account: ", req.params.account);
		console.log("****	for transaction: ", req.params.transaction);
		console.log("****	with rev: ", req.params.rev);

		transactionDao.deleteTransaction(req.params.transaction, req.params.rev, function(err, body){
			if(err){
				res.setStatus(400);
				res.json(err);
			} else {
				res.json({success:true});
			}
		});



	}
	return app;
}();
