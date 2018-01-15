(function () {
    'use strict';

    angular.module('app').directive('categoryForm', [function () {
        return {
            restrict: 'E',
            templateUrl: 'views/partials/category/category-form.html'
        }
    }])

    angular.module('app').directive('categoryList', [function () {
        return {
            restrict: 'E',
            templateUrl: 'views/partials/category/category-list.html'
        }
    }])
}());