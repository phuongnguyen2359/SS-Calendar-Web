(function () {
    "use strict";

    angular
        .module('AngularDemo')
        .controller('SSCtrl', ['errorService', '$scope', '$location', 'ssService', '$window', '$rootScope', function (errorService, $scope, $location, ssService, $window, $rootScope) {
            var vm = this;
            vm.log = {};
            vm.users = [];
            vm.bookings = [];
            vm.user = {};
            vm.userEdit = {};
            vm.bookEvent = {};

            $scope.showPassword = false;
            $scope.toggleShowPassword = function () {
                $scope.showPassword = !$scope.showPassword;
            }

            $rootScope.myvalue = true;
            $scope.anyFunc = function (var1) {
                var username = var1.slice(3);
                ssService
                    .delUser(username)
                    .catch(function (error) {
                        errorService.catch(error);
                    });
            }
            // get users list
            ssService
                .getUsers()
                .then(function (result) {
                    vm.users = result.data;
                })
                .catch(function (error) {
                    errorService.catch(error);
                });

            //get booking list
            ssService
                .getBookings()
                .then(function (result) {
                    vm.bookings = result.data;
                    $rootScope.myvalue = true;
                    enter(vm.bookings);
                })
                .catch(function (error) {
                    errorService.catch(error);
                });

            // add user
            vm.addUser = function () {
                ssService
                    .addUser(vm.user)
                    .then(function (result) {
                        successModal();
                        vm.user.username = "";
                        vm.user.password = "";
                        ssService
                            .getUsers()
                            .then(function (result) {
                                vm.users = result.data;
                            })
                            .catch(function (error) {
                                errorService.catch(error);
                            });
                    })
                    .catch(function (error) {
                        errorService.catch(error);
                    });
                angular.element('#usernameFilde').val('');
                angular.element('#passwordFilde').val('');
                angular.element('#repasswordFilde').val('');
                $scope.addForm.$setPristine();
            };
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

            // edit user 
            vm.editUser = function (user) {
                ssService
                    .editUser(user)
                    .then(function (result) {
                        hideModal();
                        ssService
                            .getUsers()
                            .then(function (result) {
                                vm.users = result.data;
                            })
                            .catch(function (error) {
                                errorService.catch(error);
                            });
                    })
                    .catch(function (error) {
                        errorService.catch(error);
                    });

            };

            // delete room
            vm.deleteRoom = function (user) {
                ssService
                    .delUser(user)
                    .then(function (result) {
                        hideModalDel();
                        ssService
                            .getUsers()
                            .then(function (result) {
                                vm.users = result.data;
                            })
                            .catch(function (error) {
                                errorService.catch(error);
                            });
                    })
                    .catch(function (error) {
                        errorService.catch(error);
                    });
            };

            // delete room calendar
            vm.deleteRoomCal = function () {

                var username = angular.element('#bookId').val();
                ssService
                    .getBooking(username)
                    .then(function (result) {
                        vm.bookEvent = result.data;
                        ssService
                            .delBooking(vm.bookEvent)
                            .then(function (result) {
                                hideModalDel();
                                ssService
                                    .getBookings()
                                    .then(function (result) {
                                        vm.bookings = result.data;
                                        $window.location.reload();
                                    })
                            })
                            .catch(function (error) {
                                errorService.catch(error);
                            });
                    })
                    .catch(function (error) {
                        errorService.catch(error);
                    });

            };

            // compare password vs Re-password 
            vm.comparePass = function () {
                var pass = vm.user.password;
                var rePass = vm.user.repassword;

                if (rePass != pass) {
                    $scope.addForm.repasswordFilde.$setValidity('comparePass', false);
                } else {
                    $scope.addForm.repasswordFilde.$setValidity('comparePass', true);
                }
            };

            // check user exited or not 
            vm.checkUser = function () {
                var userName = vm.user.username;
                if (userName) {
                    for (i = 0; i < vm.users.length; i++) {
                        if (userName.toLowerCase() == vm.users[i].username.toLowerCase()) {
                            $scope.addForm.username.$setValidity('checkUser', false);
                            break;
                        }
                        else {
                            $scope.addForm.username.$setValidity('checkUser', true);
                        }
                    }
                } else {
                    $scope.addForm.username.$setValidity('checkUser', true);
                }
            };

            // check login 
            vm.checkLogin = function () {
                var userLog = vm.log.userName;
                var passLog = vm.log.passWord;
                for (var i = 0; i < vm.users.length; i++) {
                    if (userLog == vm.users[i].username && passLog == vm.users[i].password) {
                        $scope.loginForm.password.$setValidity('checkLogin', true);
                        break;
                    }
                    else {
                        $scope.loginForm.password.$setValidity('checkLogin', false);
                    }
                }
            };

        }]);
})();