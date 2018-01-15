(function () {
    'use strict';

    angular.module('app').directive('cityForm', [function () {
        return {
            restrict: 'E',
            templateUrl: 'views/partials/city/city-form.html'
        }
    }])

    angular.module('app').directive('cityList', [function () {
        return {
            restrict: 'E',
            templateUrl: 'views/partials/city/city-list.html'
        }
    }])
}());