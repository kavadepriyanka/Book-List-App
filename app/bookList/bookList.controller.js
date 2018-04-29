(function () {
    angular.module('BookApp')
        .controller('BookListController', bookListCtrl);
    
    bookListCtrl.$inject = ['$scope', '$http', '$modal', '$log'];

    function bookListCtrl($scope, $http, $modal, $log) {
        $log.log('in Book List Controller');
    
        $scope.addBook = addBook;
        $scope.editBook = editBook;
        $scope.deleteBook = deleteBook;
        $scope.gridOptions = {
            paginationPageSize: 25, // page size, defaults to the first item in paginationPageSizes
            paginationPageSizes: [15, 25, 50, 100], // array of page sizes
            rowHeight: 65,
            headerRowHeight: 40,
            appScopeProvider: $scope,
            columnDefs: [
                {
                    field: "ID",
                    displayName: "ID",
                    maxWidth: 48
                }, {
                    field: 'Title',
                    displayName: 'Title'
                }, {
                    field: 'Description',
                    displayName: 'Description'
                }, {
                    field: 'Excerpt',
                    displayName: 'Excerpt'
                },{
                    field: 'PageCount',
                    displayName: 'Page Count'
                }, {
                    field: 'PublishDate',
                    displayName: 'Publish Date'
                }, {
                   field: 'Actions',
                   displayName: 'Actions',
                   cellTemplate: '<div class="button-padding"><button ng-click="grid.appScope.editBook(row)">Edit</button>'+
                                '<button ng-click="grid.appScope.deleteBook(row)">Delete</button></div>'
                }
            ]
        };

        $scope.book = {};
        $scope.showAddBook = false;

        $scope.submit = function () {
            $log.log($scope.book);
            var reqBody = {
                "ID": $scope.gridOptions.data.length + 1,
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
            $scope.showAddBook = false;
        }

        function addBook() {
            $log.log('in add book');
            $modal.open({
                templateUrl: 'myAddBookModal.html',
                backdrop: true,
                windowClass: 'modal',
                controller: //'AddBookModalController'
                function ($scope, $modalInstance) { //addBookModalController
                    $log.log('modal loaded');
                    $scope.submit = function () {
                        $modalInstance.close('book added');
                    }
                    $scope.cancel = function () {
                        $modalInstance.dismiss('cancel');
                    }
                }
            });
            // $scope.showAddBook = true;
        }

        function editBook(row) {
            $log.log('row to edit', row);
        }

        function deleteBook(row) {
            $log.log('row to edit', row);
            $http.delete('http://fakerestapi.azurewebsites.net/api/Books/'+row.entity.ID)
                .then(function (response) {
                    $log.log('book deleted successfully');
                }, function (error) {
                    $log.log(error);
                });
        }

        function initializeGrid() {
            var req = {
                method: 'GET',
                url: 'http://fakerestapi.azurewebsites.net/api/Books',
                headers: {
                  'Content-Type': 'application/json'
                }
               }
               
               $http(req).then(function(resp){
                // $log.log(resp);
                $scope.gridOptions.data = resp.data;
               }, function(error){
                   $log.log(error);
               });   
        }
        initializeGrid();
    }
})();