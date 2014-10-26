funds.controller('AccountsController', ['$scope', '$http', function($scope, $http){

    $http.get('/api/accounts')
    .success(function(data){
        $scope.accounts = data;
    })
    .error(function(data){
        console.error('error:', data);
        $scope.accounts = [];
    });

}]);
