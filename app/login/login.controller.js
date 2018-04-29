(function (){
    angular.module('BookApp')
            .controller('LoginController', loginController);
    
    loginController.$inject = ['$scope', '$location', '$http', '$log'];

    function loginController($scope, $location, $http, $log) {
        $scope.header = 'Login to Proceed';

        $scope.login = login;
        $scope.user = {};
        $scope.admin = {
            "username": "jack",
            "password": "jill"
        }
        $scope.showLogin = false;

        function isValidUser() {
            var validUser = false;
            // $http.get('admin.json').then(function(data) {
            //     $log.log('in success'+data);
            //     if((data.username === $scope.user.username) && (data.password === $scope.user.password)) {
            //         validUser = true;
            //     }
            //   }, function(error) {
            //     $log.log('in error '+error);
            // });

            if(($scope.admin.username === $scope.user.username) && ($scope.admin.password === $scope.user.password)) {
                validUser = true;
            }

            return validUser;
        }

        function login() {
            // $log.log($scope.user);

            if(isValidUser()) {
                $location.path('/books');   
            } else {
                alert('Incorrect Username or password');
            }
            $scope.user = {};
            $scope.form.$setPristine();
        }
    }
})();