funds.service('LoginService', ['$http', function($http){

    var LoginService = {};

    LoginService.login = function(user, password){
        return $http.post('/api/login', {
            username:user,
            password:password
        });
    }

    LoginService.signup = function(user, password, password_confirmation, email){
        return $http.post('/api/signup', {
            username:user,
            password:password,
            password_confirmation:password_confirmation,
            email:email
        });
    }

    return LoginService;

}]);
