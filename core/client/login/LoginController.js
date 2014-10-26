funds.controller('LoginController', ['$scope', '$state', 'LoginService', function($scope, $state, loginService){

    $scope.login = function(username, password) {
        loginService.login(username, password)
        .success(function(data){
            console.log('success!', data);
            $state.go('accounts', {});
        })
        .error(function(data){
            console.error('error:', data);
        });
    }

    $scope.signup = function(username, password, password_confirmation, email) {
        loginService.login(username, password, password_confirmation, email)
        .success(function(data){
            console.log('success!', data);
            $state.go('accounts', {});
        })
        .error(function(data){
            console.error('error:', data);
        });
    }

    $scope.setupSignup = function(){
        $state.go('signup');
    }

}]);
