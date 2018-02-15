(function () {
    'use strict';

    angular.module('app').directive('regionForm', [function () {
        return {
            restrict: 'E',
            templateUrl: 'views/partials/region/region-form.html'
        }
    }])

    angular.module('app').directive('regionList', [function () {
        return {
            restrict: 'E',
            templateUrl: 'views/partials/region/region-list.html'
        }
    }])
}());