angular.module('AngularDemo').factory('authFact',[function(){
    var authFact = {};

    authFact.setAccessToken = function(accessToken){
        authFact.authToken = accessToken;
    };

    authFact.getAccessToken = function(){
        return authFact.authToken;
    };
    return authFact;
}]);