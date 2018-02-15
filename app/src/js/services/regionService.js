(function () {
    'use strict';

    angular.module('app').service('regionService', ['api', function (api) {

        this.saveRegion = function (region) {
            if (region.hasOwnProperty('id') && region.id) {
                return api.editRegion(region).then(function (res) {
                    return res;
                });
            } else {
                return api.saveRegion(region).then(function (res) {
                    return res;
                });
            }
        };

        this.deleteRegion = function (region) {
            return api.deleteRegion(region).then(function (res) {
                return res;
            });
        };

        this.getRegionByName = function (name) {
            return api.getRegionByName(name).then(function (res) {
                return res;
            });
        };

        this.getAllRegions = function () {
            return api.getAllRegions().then(function (res) {
                return res;
            })
        }

    }]);
}());