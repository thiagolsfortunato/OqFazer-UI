(function () {
    'use strict';

    angular.module('app').service('api', ['$http', 'config', function ($http, config) {

        var KEY_STORAGE = 'token';
        var host = config.apiUrl();
        var baseUrl = host;

        /**
         * CRUD City
         */

        this.saveCity = function (city) {
            return $http({
                method: 'POST',
                url: baseUrl + '/api/city',
                data: city,
                headers: {
                    'Content-type': 'application/json;charset=utf-8',
                    'X-Auth-Token': StorageHelper.getItem(KEY_STORAGE)
                }
            });
        };

        this.deleteCity = function (city) {
            return $http({
                method: 'DELETE',
                url: baseUrl + '/api/city',
                data: city,
                headers: {
                    'Content-type': 'application/json;charset=utf-8',
                    'X-Auth-Token': StorageHelper.getItem(KEY_STORAGE)
                }
            });
        };

        this.editCity = function (city) {
            return $http({
                method: 'PUT',
                url: baseUrl + '/api/city',
                data: city,
                headers: {
                    'Content-type': 'application/json;charset=utf-8',
                    'X-Auth-Token': StorageHelper.getItem(KEY_STORAGE)
                }
            });
        };

        this.getCityByName = function (city) {
            return $http({
                method: 'GET',
                url: baseUrl + '/api/city',
                params:{
                    name : city.name
                },
                headers: {
                    'X-Auth-Token': StorageHelper.getItem(KEY_STORAGE)
                }
            });
        };

        this.getAllCities= function () {
            return $http({
                method: 'GET',
                url: baseUrl + '/api/cities',
                headers: {
                    'X-Auth-Token': StorageHelper.getItem(KEY_STORAGE)
                }
            });
        };


        /**
         * CRUD Category
         */

        this.saveCategory = function (category) {
            return $http({
                method: 'POST',
                url: baseUrl + '/api/category',
                data: category,
                headers: {
                    'Content-type': 'application/json;charset=utf-8',
                    'X-Auth-Token': StorageHelper.getItem(KEY_STORAGE)
                }
            });
        };

        this.deleteCategory = function (category) {
            return $http({
                method: 'DELETE',
                url: baseUrl + '/api/category',
                data: category,
                headers: {
                    'Content-type': 'application/json;charset=utf-8',
                    'X-Auth-Token': StorageHelper.getItem(KEY_STORAGE)
                }
            });
        };

        this.editCategory = function (category) {
            return $http({
                method: 'PUT',
                url: baseUrl + '/api/category',
                data: category,
                headers: {
                    'Content-type': 'application/json;charset=utf-8',
                    'X-Auth-Token': StorageHelper.getItem(KEY_STORAGE)
                }
            });
        };

        this.getCategoryByName = function (category) {
            return $http({
                method: 'GET',
                url: baseUrl + '/api/category',
                params:{
                    name : category.name
                },
                headers: {
                    'X-Auth-Token': StorageHelper.getItem(KEY_STORAGE)
                }
            });
        };

        this.getAllCategories= function () {
            return $http({
                method: 'GET',
                url: baseUrl + '/api/categories',
                headers: {
                    'X-Auth-Token': StorageHelper.getItem(KEY_STORAGE)
                }
            });
        };

        /**
         * CRUD User
         */
        this.saveUser = function (user) {
            return $http({
                method: 'POST',
                url: baseUrl + '/api/user',
                data: user,
                headers: {
                    'Content-type': 'application/json;charset=utf-8',
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

        this.getUserByName = function (name) {
            return $http({
                method: 'GET',
                url: baseUrl + '/api/user',
                params:{
                    name : name
                },
                headers: {
                    'X-Auth-Token': StorageHelper.getItem(KEY_STORAGE)
                }
            });
        };

        this.getUserByUsername = function (username) {
            return $http({
                method: 'GET',
                url: baseUrl + '/api/username',
                params:{
                    username : username
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