(function () {
    'use strict';

    angular.module('app').factory('interceptor', function () {
        return {
            request: function (config) {
                if (config.url.indexOf("/api") !== -1) {
                    config.url = config.url.slice(0, (config.url.indexOf("/api"))) + location.pathname + config.url.slice(config.url.indexOf("api"));
                }
                return config;
            }
        };
    });
}());