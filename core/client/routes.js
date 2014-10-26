funds.config(function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise("/login");

    //
    // Now set up the states
    $stateProvider
      .state('home', {
        url: "/home",
        templateUrl: "home-template.html"
      })
      .state('login', {
        url: "/login",
        templateUrl: "login-template.html"
      })
      .state('signup', {
        url: "/signup",
        templateUrl: "signup-template.html"
      })
      .state('accounts', {
        url: "/accounts",
        templateUrl: "accounts-template.html"
      })
      .state('account', {
        url: "/account/:accountId",
        templateUrl: "transactions-template.html"
      });
});
