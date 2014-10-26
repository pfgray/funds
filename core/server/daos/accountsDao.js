/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
 module.exports = function() {
    var config = require('../../../config');
    var nano = require('nano')('http://'+config.couch.host+':'+config.couch.port);
    var db = nano.use('funds');
    var md5 = require('MD5');

    return {
        getSharedAccounts : function(user_id, callback){
            db.view('money', 'shared_accounts', {include_docs:true, startkey:[user_id], endkey:[user_id, {}]},function(err, body) {
                if (!err) {
                    var rows = new Array();
                    for(var i=0; i<body.rows.length; i+=2){
                        rows.push({
                            id: body.rows[i].doc._id,
                            name: body.rows[i].doc.name,
                            type: body.rows[i].doc.type,
                            owner:{
                                username: body.rows[i+1].doc.username,
                                avatar: body.rows[i+1].doc.email
                            }
                        });
                    }
                    callback(null, rows);
                }else{
                    console.log(JSON.stringify(err));
                    callback(err);
                }
            });
        },
        insert : function(account, callback){
            console.log('inserting account: ' + JSON.stringify(account));
            db.insert(account, null, function(err, body, header) {
                if (err) {
                    console.log('error inserting account: ' + err);
                    callback(err);
                }else{
                    callback (null, body);
                }
            });
        }
    };
}();
