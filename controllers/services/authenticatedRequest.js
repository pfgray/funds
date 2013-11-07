/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
var md5 = require('MD5');

 module.exports = function(advised) {
 	console.log('...setting up advice');
    return function(req, res){
        if(req.session.user == null){
        	console.log('redirecting user...');
            res.redirect(303, '/login');
        }else{
        	var model = {};
        	model.user = {
				username: req.session.user.username,
				avatar: '//www.gravatar.com/avatar/' + md5(req.session.user.email),
				email: req.session.user.email
			};
        	console.log('Authentication Found!');
            advised(req, res, model);
        }
	};
};