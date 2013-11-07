/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
 module.exports = function() {
    var config = require('../../config');
    var nano = require('nano')('http://'+config.couch.host+':'+config.couch.port);
    var db = nano.use('funds');
    var md5 = require('MD5');

    return {
        getTransactions : function(callback){
            var now = new Date();
            var endKey = new Date(now.getFullYear(), now.getMonth());
            var startKey = new Date(endKey.getFullYear(), endKey.getMonth()+1); 
            db.view('money', 'transactions', {descending:true,startkey:startKey.getTime(),endkey:endKey.getTime()},function(err, body) {
                if (!err) {
                    var rows = new Array();
                    body.rows.forEach(function(doc) {
                        rows.push(doc.value);
                    });
                    callback(rows);
                }else{
                    console.log(JSON.stringify(err));
                    return err;
                }
            });
        },
        addTransaction : function(transaction){
            db.insert(transaction, null, function(err, body, header) {
              if (err) {
                console.error('error inserting transaction');
                return;
            }
        });
        },
        getTotalForMonth : function(account_id, callback){
            var now = new Date();
            var key = [account_id, now.getFullYear(), now.getMonth()];
            db.view('money', 'transaction_totals', {key:key}, function(err, body) { 
                if (!err) {
                    if(body.rows.length == 0){
                        callback(0);
                    } else {
                        callback(body.rows[0].value);
                    }
                }
            });
        },
        getTotalForMonthTag : function(callback){
            var now = new Date();
            var key = [now.getFullYear(), now.getMonth()];
            db.view('money', 'transaction_totals', {key:key}, function(err, body) {
                if (!err) {
                    callback(body.rows[0].value);
                }
            });
        },
        getAllForMonthTag : function(tag, callback){
            var now = new Date();
            var startKey = new Date(now.getFullYear(), now.getMonth());
            var endKey = new Date(now.getFullYear(), now.getMonth() + 1);
            db.view('money', 'transactions_tags', {startKey:[startKey, tag],endKey:[endKey, tag],reduce:false}, function(err, body) {
                if (!err) {
                    var rows = new Array();
                    body.rows.forEach(function(doc) {
                        rows.push(doc.value);
                    });
                    callback(rows);
                }
            });
        },
        getTransactionsForAcountForDate : function(account_id, date, callback){
            console.log("getting transactions for date: " + date.getTime());
            db.view('money', 'transactions_user', {descending:true,startkey:[account_id, 8640000000000000],endkey:[account_id, date.getTime()],include_docs:true},function(err, body) {
                if (!err) {
                    var transactions = new Array();
                    for(var i=0; i<body.rows.length; i+=2){
                        var transaction = {
                            tags: body.rows[i].doc.tags,
                            amount: body.rows[i].doc.amount,
                            timestamp:  body.rows[i].doc.timestamp,
                            store:  body.rows[i].doc.store,
                            user_avatar: '//www.gravatar.com/avatar/' + md5(body.rows[i+1].doc.email)
                        }
                        transactions.push(transaction);
                    }
                    callback(null, transactions);
                }else{
                    console.log(JSON.stringify(err));
                    callback(err);
                }
            });
       },
       getTransactionPercentsForAcountForDate : function(account_id, date, callback){

            //http://192.168.1.150:5984/funds/_design/money/_view/tag_percentage?startkey=["104011d9bac9fad553650b8eab0001a2",2013,9]&endkey=["104011d9bac9fad553650b8eab0001a2",2013,9,{}]&group=true
            
            console.log("getting transactions for date: " + date.getTime());
            var startkey = [account_id, date.getFullYear(), date.getMonth()];
            var endkey = [account_id, date.getFullYear(), date.getMonth(), {}];

            db.view('money', 'tag_percentage', {startkey:startkey,endkey:endkey,group:true}, function(err, body) {
                if (!err) {
                    var tags = new Array();
                    for(var i=0; i<body.rows.length; i++){
                        var tag = {
                            name:body.rows[i].key[3],
                            value:body.rows[i].value
                        }
                        console.log('pushing tag: ' + JSON.stringify(tag));
                        tags.push(tag);
                    }
                    callback(null, tags);
                }else{
                    console.log(JSON.stringify(err));
                    callback(err);
                }
            });
       }
   };
}();