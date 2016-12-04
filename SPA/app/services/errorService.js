(function () {
    "use strict";
    angular
        .module('AngularDemo')
        .factory('errorService', ['toastr', function (toastr) {
            var service = {};

            service.catch = function (error) {
                toastr.error(error.data.error, "Error");
            };
            return service;
        }]);
})();