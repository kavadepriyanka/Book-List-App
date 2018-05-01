(function () {
    angular.module('BookApp')
            .controller('AddBookModalController', addBookModalCtrl);
    
    addBookModalCtrl.$inject = ['$scope', '$log', '$modalInstance', 'gridDataLen', '$http'];

    function addBookModalCtrl($scope, $log, $modalInstance, gridDataLen, $http) {
        $log.log('modal loaded');
        $scope.book = {};
        $scope.submit = function () {
            $log.log($scope.book);
            var reqBody = {
                "ID": gridDataLen + 1,
                "Title": $scope.book.title,
                "Description": $scope.book.description,
                "PageCount": $scope.book.pageCount,
                "Excerpt": $scope.book.excerpt,
                "PublishDate": $scope.book.publishDate
                }
                
                var postBookUrl = 'http://fakerestapi.azurewebsites.net/api/Books';

                $http.post(postBookUrl, reqBody).then(function(response) {
                    $log.log('posted Book', response);
                }, function(error) {
                    $log.log('Book post failed', error);
                });
            $modalInstance.close('book added');
        }
        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        }
    }
})();