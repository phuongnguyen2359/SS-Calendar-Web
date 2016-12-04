(function () {
    "use strict";
    angular.
        module('AngularDemo')
        .factory('logService', ['$http', '$cookies', function ($http, $cookies) {
            var logService = {};
            logService.doLogin = function (userObj) {                                
                $cookies.put('myFavorite', userObj);               
                var myFavorite = $cookies.get('myFavorite');                               
            };
            logService.getAuthStatus = function () {                
                var status = $cookies.get('myFavorite');                
                if (status) {
                    return true;
                } else {
                    return false;
                }
            };            
            logService.doUserLogout = function () {
                $cookies.put('myFavorite', undefined);               
                var myFavorite = $cookies.get('myFavorite');
            };
            return logService;
        }])

})();