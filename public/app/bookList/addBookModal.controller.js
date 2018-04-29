(function () {
    angular.module('BookApp')
            .controller('AddBookModalController', addBookModalCtrl);
    
    addBookModalCtrl.$inject = ['$scope', '$log', '$modalInstance'];

    function addBookModalCtrl($scope, $log, $modalInstance) {
        $log.log('modal loaded');
        $scope.submit = function () {
            $modalInstance.close('book added');
        }
        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        }
    }
})();