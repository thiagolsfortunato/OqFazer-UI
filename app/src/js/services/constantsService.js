(function () {
    'use strict';

    angular.module('app').service('constantsService', [function () {

        this.getAuthorities = function () {
            return [
                {value: 'ROLE_ADMIN', name: 'ADMIN'},
                {value: 'ROLE_OWNER', name: 'OWNER'},
                {value: 'ROLE_PARTICIPANT', name: 'PARTICIPANT'}
            ];
        };

    }]);
}());