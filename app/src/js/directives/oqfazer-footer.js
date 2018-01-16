(function () {
    'use strict';

    angular.module('app').directive('oqfazerFooter', [ function () {
        return {
            restrict: 'E',
            templateUrl: 'views/partials/footer.html'
        }
    }]);
}());