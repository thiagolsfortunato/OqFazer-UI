(function () {
    'use strict';

    angular.module('app').factory('environment', function () {
        return {
            PROD: 'production',
            DEV: 'development'
        };
    });
}());
