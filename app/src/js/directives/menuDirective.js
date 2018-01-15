(function () {
    'use strict';

    angular.module('app')
        .directive('menuForm', [function () {
            return {
                restrict: 'E',
                templateUrl: 'views/partials/menu/menu-form.html'
            }
        }])
}());