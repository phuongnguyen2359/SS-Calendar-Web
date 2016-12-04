(function () {
    "use strict";
    angular
        .module('AngularDemo')
        .controller('RoomCtrl', ['roomService', 'errorService', '$scope', 'logService', '$location', '$rootScope', function (roomService, errorService, $scope, logService, $location, $rootScope) {
            var vm = this;
            vm.rooms = [];
            vm.allRooms = [];
            vm.review = {};
            vm.roomEdit = {}
            vm.bookings = [];

            $rootScope.myvalue = true;
            // get rooms list
            roomService
                .getRooms()
                .then(function (result) {
                    vm.rooms = result.data;
                })
                .catch(function (error) {
                    errorService.catch(error);
                });

            roomService
                .getallRooms()
                .then(function (result) {
                    vm.allRooms = result.data;
                })
                .catch(function (error) {
                    errorService.catch(error);
                });

            //get booking lists            
            roomService
                .getBookings()
                .then(function (result) {
                    vm.bookings = result.data;
                })
                .catch(function (error) {
                    errorService.catch(error);
                });

            // add room               
            vm.addReview = function () {
                vm.review.status = 1;
                roomService
                    .addRoom(vm.review)
                    .then(function (result) {
                        successModal();
                        vm.review.name = "";
                        vm.review.description = "";
                        roomService
                            .getRooms()
                            .then(function (result) {
                                vm.rooms = result.data;
                            })
                            .catch(function (error) {
                                errorService.catch(error);
                            });
                    })
                    .catch(function (error) {
                        errorService.catch(error);
                    });
                angular.element('#idDescrip').val('');
                angular.element('#inputEmail3').val('');
                $scope.addForm.$setPristine();
            };

            // get room via id
            vm.getRoom = function (id) {
                roomService
                    .getRoom(id)
                    .then(function (result) {
                        vm.roomEdit = result.data;
                    })
                    .catch(function (error) {
                        errorService.catch(error);
                    });
            };

            // delete room
            vm.deleteRoom = function (room) {
                roomService
                    .delRoom(room)
                    .then(function (result) {
                        hideModalDel();
                        roomService
                            .getRooms()
                            .then(function (result) {
                                vm.rooms = result.data;
                            })
                            .catch(function (error) {
                                errorService.catch(error);
                            });
                    })
                    .catch(function (error) {
                        errorService.catch(error);
                    });
            };

            vm.editRoom = function (room) {
                roomService
                    .editRoom(room)
                    .then(function (result) {
                        hideModal();
                        roomService
                            .getRooms()
                            .then(function (result) {
                                vm.rooms = result.data;
                            })
                            .catch(function (error) {
                                errorService.catch(error);
                            });
                    })
                    .catch(function (error) {
                        errorService.catch(error);
                    });
            };

            // check room exited or not
            vm.checkRoom = function () {
                var userName = vm.review.name;
                if (userName) {
                    userName.trim();
                    for (var i = 0; i < vm.rooms.length; i++) {
                        if (userName.toLowerCase() == vm.rooms[i].name.toLowerCase().trim()) {
                            $scope.addForm.roomTitle.$setValidity('checkRoom', false);
                            break;
                        }
                        else {
                            $scope.addForm.roomTitle.$setValidity('checkRoom', true);
                        }
                    }
                } else {

                    $scope.addForm.username.$setValidity('checkUser', true);
                }
            };
        }]);
})();