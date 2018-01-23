(function () {
    'use strict';

    angular.module('app').directive('oqfazerHeader', [ function () {
        return {
            restrict: 'E',
            templateUrl: 'views/partials/header.html',
            controller: 'headerCtrl'
        };
    }]);
}());