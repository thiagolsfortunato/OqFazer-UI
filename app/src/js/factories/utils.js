(function () {
    'use strict';

    angular.module('app').factory('utils', function () {
        return {
            findPosition: function (list, id) {
                for (var i = 0; i < list.length; i++) {
                    if (list[i].id === id) {
                        return i;
                    }
                }
            }
        };
    });
}());