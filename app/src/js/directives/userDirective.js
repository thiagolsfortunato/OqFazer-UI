(function () {
    'use strict';

    angular.module('app').directive('userForm', [function () {
        return {
            restrict: 'E',
            templateUrl: 'views/partials/user/user-form.html'
        }
    }])

    angular.module('app').directive('userList', [function () {
        return {
            restrict: 'E',
            templateUrl: 'views/partials/user/user-List.html'
        }
    }])
}());