(function () {
    "use strict";
    var myapp = angular.module('AngularDemo', ['ngRoute', 'ngMessages', 'ngCookies']);
    myapp.constant('toastr', toastr)
    myapp.config(['$routeProvider', function ($routeProvider) {

        $routeProvider
            .when('/dashboard', {
                templateUrl: 'partials/home.html',
                controller: 'SSCtrl',
                controllerAs: 'vm',
                authenticated: true
            })
            .when('/', {
                templateUrl: 'partials/login.html',
                controller: 'LogCtrl',
                controllerAs: 'vm'
            })

            .when('/logout', {
                templateUrl: 'partials/login.html',
                controller: 'LogCtrl',
                controllerAs: 'vm',
                authenticated: true
            })

            .when('/room-availability', {
                templateUrl: 'partials/room-availability.html',
                controller: 'RoomCtrl',
                controllerAs: 'vm',
                authenticated: true,
            })

            .when('/manage-room', {
                templateUrl: 'partials/manage-room.html',
                controller: 'RoomCtrl',
                controllerAs: 'vm',
                authenticated: true,
            })

            .when('/account-setting', {
                templateUrl: 'partials/account-setting.html',
                controller: 'SSCtrl',
                controllerAs: 'vm',
                authenticated: true,
            })

            .otherwise({
                redirectTo: '/'
            });
    }]);

    myapp.run(["$rootScope", "$location", "logService", function ($rootScope, $location, logService) {
        $rootScope.$on('$routeChangeStart', function (event, next, current) {

            if (next.$$route.authenticated) {
                if (!logService.getAuthStatus()) {
                    $location.path('/');
                }
            }
            if (next.$$route.originalPath == '/') {
                if (logService.getAuthStatus()) {
                    $location.path(current.$$route.originalPath);
                }
            }
        });
    }]);
})();
