(function (){
    angular.module('BookApp')
            .controller('LoginController', loginController);
    
    loginController.$inject = ['$scope', '$location', '$http', '$log'];

    function loginController($scope, $location, $http, $log) {
        $scope.header = 'Login to Proceed';

        $scope.login = login;
        $scope.user = {};
        $scope.admin = {}

        $scope.showLogin = false;

        function login() {
            console.log($scope.user, $scope.admin);
            if($scope.admin.username === $scope.user.username && $scope.admin.password === $scope.user.password) {
                $location.path('/books');   
            } else {
                alert('Incorrect Username or password');
            }
            $scope.user = {};
            $scope.form.$setPristine();
        }

        function onInit() {
            $http.get('app/login/admin.json').then(function(data) {
                $log.log('in success'+data);
                console.log(data);
                $scope.admin = data.data[0];
              }, function(error) {
                $log.log('in error '+error);
            });
        }

        onInit();
    }
})();