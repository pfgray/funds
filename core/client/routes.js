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
      .state('accounts', {
        url: "/accounts",
        templateUrl: "accounts-template.html"
      });
});
