/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
module.exports = function() {
    var fs = require('fs');
    var moment = require('moment');
    var ejs = require('ejs');
	var viewFolder = 'views';
    var nullSafe = function(input){
        if(input == null){
            return '';
        }else if(typeof input == 'undefined'){
            return '';
        }else{
            return input;
        }
    }


    return {
        render: function(view, model, callback) {
            fs.readFile(viewFolder + '/' + view, 'utf8', function(err, file) {
                model.moment = moment;
                model.slate = {
                    nullSafe:nullSafe
                }
                model.filename = __dirname + '/../../' + viewFolder + '/' + view;
                callback(ejs.render(file, model));
            });
        }
    };
}();

