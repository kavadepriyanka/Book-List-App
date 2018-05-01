(function () {
    angular.module('BookApp', ['ngRoute', 'ui.grid', 'ui.grid.autoResize', 'ui.grid.pagination', 'ui.bootstrap'])
    .config(configFn);

    configFn.$inject = ['$routeProvider'];

    function configFn($routeProvider){
        // $urlRouterProvider.otherwise("/books");

        // $stateProvider.state('login', {
        //     url: '/login',
        //     templateUrl: 'login/login.html',
        //     controller: 'LoginController'
        // })
        // .state('bookList', {
        //     url: '/books',
        //     templateUrl: 'bookList/book-list.html',
        //     controller: 'BookListController'
        // })

        console.log('configuring routes');
        $routeProvider
        .when('/books', {
            controller: 'BookListController',
            templateUrl: 'app/bookList/book-list.html'
        })
        .when('/login', {
            controller: 'LoginController',
            templateUrl: 'app/login/login.html'
        })
        .otherwise({ redirectTo: '/login' });
    }
    
})();