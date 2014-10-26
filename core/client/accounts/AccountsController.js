funds.controller('AccountsController', ['$scope', '$http', function($scope, $http){

    var refreshAccounts = function(){
        $http.get('/api/accounts')
        .success(function(data){
            $scope.accounts = data;
        })
        .error(function(data){
            console.error('error:', data);
            $scope.accounts = [];
        });
    }
    refreshAccounts();

    $scope.createAccount = function(name, type){
        $http.post('/api/accounts', {
            name:name,
            type:type
        })
        .success(function(data){
            refreshAccounts();
        })
        .error(function(data){
            console.error(data);
        });
    }

}]);
