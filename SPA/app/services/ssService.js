(function () {
    "use strict";
    angular
        .module('AngularDemo')
        .factory('ssService', ['$http', function ($http) {
            var service = {};

            service.getUsers = function () {
                return $http.get('api/ss');
            };

            service.getBookings = function () {
                return $http.get('api/ss/booking');
            };

            service.getBooking = function (id) {
                return $http.get('api/ss/booking/' + id);
            };

            service.getUser = function (id) {
                return $http.get('api/ss/' + id);
            };

            service.editUser = function (user) {
                return $http.put('api/ss/edit', user);
            };

            service.delRoom = function (user) {
                return $http.post('api/ss/del', user);
            };

            service.addUser = function (user) {
                return $http.post('api/ss/add', user);
            };

            service.delUser = function (user) {
                return $http.post('api/ss/del', user);
            };

            service.delBooking = function (booking) {
                return $http.post('api/ss/booking/del', booking);
            };
            return service;
        }]);
})();