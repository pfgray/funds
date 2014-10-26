/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
 module.exports = function() {
    var config = require('../../../config');
    var nano = require('nano')('http://'+config.couch.host+':'+config.couch.port);
    var db = nano.use('funds');

    return {
        getUser : function(username, callback){
            db.view('money', 'users', {key:username},function(err, body) {
                if (!err) {
                    if(body.rows.length > 0){
                        callback(null, body.rows[0].value);
                    }else{
                        callback(null, null);
                    }
                }else{
                    console.log(JSON.stringify(err));
                    callback(err, null);
                }
            });
        },
        insertUser : function(user, callback){
            db.insert(user, null, function(err, body, header) {
                if (err) {
                    callback(err);
                }else{
                    user._id = body.id;
                    callback(null, user);
                }
            });
        },
        getAccountsForUserId : function(userId, callback){
            db.view('money', 'accounts', {startkey:[userId],endkey:[userId, 2]}, function(err, body) {
                if (!err) {
                    var rows = new Array();
                    body.rows.forEach(function(doc) {
                        rows.push(doc.value);
                    });
                    callback(rows);
                }
            });
        },
        getAll : function(callback){
            db.view('money', 'users', null,function(err, body) {
                if (!err) {
                    var users = [];
                    if(body.rows.length > 0){
                        body.rows.forEach(function(row){
                            users.push(row.value);
                        });
                        console.log("returning: " + JSON.stringify(users));
                        callback(null, users);
                    }else{
                        callback(null, null);
                    }
                }else{
                    console.log(JSON.stringify(err));
                    callback(err, null);
                }
            });
        },
    };
}();
