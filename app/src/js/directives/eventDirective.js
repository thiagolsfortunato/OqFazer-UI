(function () {
    'use strict';

    angular.module('app').directive('eventForm', [function () {
        return {
            restrict: 'E',
            templateUrl: 'views/partials/event/event-form.html'
        }
    }])

    angular.module('app').directive('eventList', [function () {
        return {
            restrict: 'E',
            templateUrl: 'views/partials/event/event-List.html'
        }
    }])
}());