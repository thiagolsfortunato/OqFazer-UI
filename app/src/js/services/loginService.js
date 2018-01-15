(function () {
    'use strict';

    angular.module('app').service('loginService', ['api', function (api) {

        var KEY_STORAGE = 'token';

        this.login = function (entry) {
            return api.doLogin(entry)
                .then(function (res) {
                    if (res.status === 200) {
                        StorageHelper.setItem(KEY_STORAGE, res.data.token);
                    }
                    return res.data;
                });
        };

        this.refreshToken = function (entry) {
            return api.refreshToken(entry)
                .then(function (res) {
                    if (res.status === 200) {
                        StorageHelper.setItem(KEY_STORAGE, res.data.token);
                    }

                    return res.data;
                }).catch(function (err) {
                    console.log(err);
                });
        };

    }]);
}());