(function () {
    'use strict';

    angular.module('app').service('userService', ['api', function (api) {

        this.saveUser = function (user) {
            if (user.hasOwnProperty('id') && user.id) {
                return api.editUser(user).then(function (res) {
                    return res;
                });
            } else {
                return api.saveUser(user).then(function (res) {
                    return res;
                });
            }
        };

        this.deleteUser = function (user) {
            return api.deleteUser(user).then(function (res) {
                return res;
            });
        };

        this.getUserByName = function (name) {
            return api.getUserByName(name).then(function (res) {
                return res;
            });
        };

        this.getAllUsers = function () {
            return api.getAllUsers().then(function (res) {
                return res;
            })
        };

    }]);
}());