(function () {
    "use strict";
    angular
        .module('AngularDemo')
        .controller('LogCtrl', ['errorService', '$scope', '$location', 'ssService', '$cookies', '$window', 'logService', '$rootScope', function (errorService, $scope, $location, ssService, $window, $cookies, logService, $rootScope) {
            var vm = this;
            vm.log = {};
            vm.users = [];
            vm.bookings = [];
            vm.user = {};
            vm.userEdit = {};

            $rootScope.myvalue = false;

            // get users list
            ssService
                .getUsers()
                .then(function (result) {
                    vm.users = result.data;
                })
                .catch(function (error) {
                    errorService.catch(error);
                });

            vm.getUser = function (username) {
                ssService
                    .getUser(username)
                    .then(function (result) {
                        vm.userEdit = result.data;
                    })
                    .catch(function (error) {
                        errorService.catch(error);
                    });

            };

            // check login 
            vm.checkLogin = function () {

                var userLog = vm.log.userName;
                var passLog = vm.log.passWord;
                var flag = false;
                for (var i = 0; i < vm.users.length; i++) {
                    if (userLog == vm.users[i].username && passLog == vm.users[i].password) {
                        logService.doLogin(vm.users[i]);
                        flag = true;
                        break;
                    }
                    else {
                        flag = false;
                    }
                }
                if (flag) {
                    $location.path('/dashboard');
                }
                else {
                    errorModal();
                }
            };

            $scope.doLogout = function () {
                logService.doUserLogout();
                $location.path('/');
            };

            $scope.doHide = function () {
                $scope.myvalue = true;
            };

        }]);
})();