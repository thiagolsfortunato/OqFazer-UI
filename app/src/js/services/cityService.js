(function () {
    'use strict';

    angular.module('app').service('cityService', ['api', function (api) {

        this.saveCity = function (city) {
            if (user.hasOwnProperty('id') && city.id) {
                return api.editCity(city).then(function (res) {
                    return res;
                });
            } else {
                return api.saveCity(city).then(function (res) {
                    return res;
                });
            }
        };

        this.deleteCity = function (city) {
            return api.deleteCity(city).then(function (res) {
                return res;
            });
        };

        this.getCityByName = function (name) {
            return api.getCityByName(name).then(function (res) {
                return res;
            });
        };

        this.getAllCities = function () {
            return api.getAllCities().then(function (res) {
                return res;
            })
        }

    }]);
}());