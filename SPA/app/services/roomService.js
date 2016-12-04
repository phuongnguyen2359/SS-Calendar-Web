(function () {
    "use strict";

    angular
        .module('AngularDemo')
        .factory('roomService', ['$http', function ($http) {
            var service = {};

            service.getRooms = function () {
                return $http.get('api/rooms');
            };

            service.getallRooms = function () {
                return $http.get('api/rooms/all');
            };

            service.getBookings = function () {
                return $http.get('api/rooms/booking');
            };

            service.getRoom = function (id) {
                return $http.get('api/rooms/' + id);
            };

            service.editRoom = function (room) {
                return $http.put('api/rooms/edit', room);
            };


            service.delRoom = function (room) {
                return $http.post('api/rooms/del', room);
            };

            service.addRoom = function (room) {
                return $http.post('api/rooms/add', room);
            };
            return service;
        }]);
})();