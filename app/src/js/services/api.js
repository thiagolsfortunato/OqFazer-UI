(function () {
    'use strict';

    angular.module('app').service('api', ['$http', 'config', function ($http, config) {

        var KEY_STORAGE = 'token';
        var host = config.apiUrl();
        var baseUrl = host;

        this.saveUser = function (user) {
            return $http({
                method: 'POST',
                url: baseUrl + '/api/user',
                data: user,
                headers: {
                    'Content-type': 'application/json;charset=utf-8',
                    'X-Auth-Token': StorageHelper.getItem(KEY_STORAGE)
                }
            });
        };

        this.deleteUser = function (user) {
            return $http({
                method: 'DELETE',
                url: baseUrl + '/api/user',
                data: user,
                headers: {
                    'Content-type': 'application/json;charset=utf-8',
                    'X-Auth-Token': StorageHelper.getItem(KEY_STORAGE)
                }
            });
        };

        this.editUser = function (user) {
            return $http({
                method: 'PUT',
                url: baseUrl + '/api/user',
                data: user,
                headers: {
                    'Content-type': 'application/json;charset=utf-8',
                    'X-Auth-Token': StorageHelper.getItem(KEY_STORAGE)
                }
            });
        };

        this.getUserByName = function (user_name) {
            return $http({
                method: 'GET',
                url: baseUrl + '/api/user',
                params:{
                    name : user_name.name
                },
                headers: {
                    'X-Auth-Token': StorageHelper.getItem(KEY_STORAGE)
                }
            });
        };

        this.getAllUsers = function () {
            return $http({
                method: 'GET',
                url: baseUrl + '/api/users',
                headers: {
                    'X-Auth-Token': StorageHelper.getItem(KEY_STORAGE)
                }
            });
        };

        this.doLogin = function (user) {
            return $http.post(baseUrl + '/api/auth', user);
        };

        this.refreshToken = function (user) {
            return $http({
                method: 'GET',
                url: baseUrl + '/api/auth',
                params: {
                    name: user.name
                },
                headers: {
                    'Content-type': 'application/json;charset=utf-8',
                    'X-Auth-Token': StorageHelper.getItem(KEY_STORAGE)
                }
            });
        };

    }]);
}());