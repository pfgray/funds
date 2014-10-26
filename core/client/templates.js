angular.module('templates-main', ['accounts-template.html', 'home-template.html', 'login-template.html', 'signup-template.html']);

angular.module("accounts-template.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("accounts-template.html",
    "<div class=accounts ng-controller=AccountsController><nav class=\"navbar navbar-default funds-navbar\" role=navigation><div class=container-fluid><!-- Brand and toggle get grouped for better mobile display --><div class=navbar-header><button type=button class=\"navbar-toggle collapsed\" data-toggle=collapse data-target=#bs-example-navbar-collapse-1><span class=sr-only>Toggle navigation</span> <span class=icon-bar></span> <span class=icon-bar></span> <span class=icon-bar></span></button> <a class=navbar-brand href=#>Funds</a></div></div><!-- /.container-fluid --></nav><div class=container><h1>These are your accounts:</h1>{{stuff}}</div></div>");
}]);

angular.module("home-template.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("home-template.html",
    "<h1>This is home!</h1>");
}]);

angular.module("login-template.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("login-template.html",
    "<div class=login ng-controller=LoginController><div class=container><div class=row><div class=col-md-7><h1 class=title>Funds</h1><p class=subtitle>Funds is a mobile-friendly web application to help you keep track of your budget, and allow you to pinpoint where you spend most of your money! Track your spending from anywhere!</p></div></div><form role=form><div class=row><div class=col-md-6><div class=form-group><input class=form-control placeholder=username type=text type=text ng-model=\"username\"></div><div class=form-group><input class=form-control placeholder=password type=password ng-model=\"password\"></div></div></div><div class=row><div class=col-md-3><button type=submit ng-click=\"login(username, password)\" class=\"btn btn-success btn-block\">Login</button></div><div class=col-md-3><button type=submit ng-click=setupSignup() class=\"btn btn-primary btn-block\">Create Account</button></div></div></form></div></div>");
}]);

angular.module("signup-template.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("signup-template.html",
    "<div class=login ng-controller=LoginController><div class=container><div class=row><div class=col-md-7><h1 class=title>Funds</h1><p class=subtitle>Funds is a mobile-friendly web application to help you keep track of your budget, and allow you to pinpoint where you spend most of your money! Track your spending from anywhere!</p></div></div><form role=form><div class=row><div class=col-md-6><div class=form-group><input class=form-control placeholder=username type=text type=text ng-model=\"username\"></div><div class=form-group><input class=form-control placeholder=password type=password ng-model=\"password\"></div><div class=form-group><input class=form-control placeholder=\"password confirmation\" type=password ng-model=\"password_confirmation\"></div><div class=form-group><input class=form-control placeholder=email ng-model=\"email\"></div></div></div><div class=row><div class=col-md-3><button type=submit ng-click=\"signup(username, password, password_confirmation, email)\" class=\"btn btn-primary btn-block\">Create Account</button></div></div></form></div></div>");
}]);
