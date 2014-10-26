funds.controller('TransactionsController', ['$scope', '$http', '$stateParams', function($scope, $http, $stateParams){

    var refreshTransactions = function(){
        $http.get('/api/accounts/' + $stateParams.accountId + '/transactions')
        .success(function(data){
            $scope.transactions = data;
        })
        .error(function(data){
            console.error('error:', data);
            $scope.transactions = [];
        });
    }
    refreshTransactions();

}]);
