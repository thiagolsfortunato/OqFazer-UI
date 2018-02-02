(function () {
    'use strict';

    angular.module('app').service('loginService', ['api', function (api) {

        var KEY_STORAGE = 'token';
        var user = {};
        var isAdmin = false;


        this.login = function (entry) {
            return api.doLogin(entry)
                .then(function (res) {
                    if (res.status === 200) {
                        user = res.data;
                        StorageHelper.setItem(KEY_STORAGE, res.data.token);
                    }
                    return user;
                });
        };

        this.refreshToken = function (entry) {
            return api.refreshToken(entry)
                .then(function (res) {
                    if (res.status === 200) {
                        user = res.data;
                        StorageHelper.setItem(KEY_STORAGE, res.data.token);
                    }
                    return user;
                }).catch(function (err) {
                    console.log(err);
                });
        };

        this.isAdmin = function (user) {
            if (typeof  user !== 'undefined' && user.hasOwnProperty('authority') && user !== null) {
                isAdmin = user.authority === "ROLE_ADMIN";
            }
            return isAdmin;
        }

    }]);
}());