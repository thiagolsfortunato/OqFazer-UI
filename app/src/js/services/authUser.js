(function () {
    'use strict';

    angular.module('app')
        .service('authUser', ['$cookies', '$location', function ($cookies, $location) {

            this.setUser = function (user) {
                $cookies.putObject('user', user);
            };

            this.setLogged = function (logged) {
                StorageHelper.setItem('logged', logged);
            };

            this.getUser = function () {
                return $cookies.getObject('user');
            };

            this.isLogged = function () {
                return StorageHelper.getItem('logged');
            };

            this.authorize = function () {
                if (!this.isLogged()) {
                    $location.path('/');
                }
            };

            this.removeCookies = function () {
                $cookies.remove('logged');
                $cookies.remove('connected');
                $cookies.remove('user');
            };
        }]);
}());

var StorageHelper = (function() {

    var SH = {};

    SH.setItem = function(chave, valor) {
        window.localStorage.setItem(chave, angular.toJson(valor));
    };

    SH.getItem = function(chave) {
        return angular.fromJson(window.localStorage.getItem(chave));
    };

    SH.removeItem = function(chave) {
        window.localStorage.removeItem(chave);
    };

    return SH;

})();