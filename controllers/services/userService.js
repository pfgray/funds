/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
 module.exports = function() {
    var userDao = require('../daos/userDao');
    var SHA256 = require("crypto-js/sha256");
    var salt = 'saltiness';

    return {
		authenticatePassword : function(username, password, callback){
		    console.log('about to authenticate user: ' + username);
		    userDao.getUser(username, function(err, user){
				if (err != null || user == null){
				    callback(false);
				}else{
				    if(JSON.stringify(SHA256(salt + username + password)) === JSON.stringify(user.password)){
						callback(true, user);
				    }else{
						callback(false);
				    }
				}
		    });
		},
		createUser : function(username, password, email, callback){
		    console.log('about to insert user: ' + username);
		    var user = {
		    	username:username,
		    	password:SHA256(salt + username + password),
		    	email:email
		    };
		    userDao.insertUser(user, function(err, user){
				if (err != null || user == null){
				    console.log('error inserting user');
				    callback(err);
				}else{
					callback(null, user);
				}
		    });
		}
    };
}();