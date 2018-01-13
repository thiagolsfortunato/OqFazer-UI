(function () {
  'use strict';

  angular.module('app').service('config', [ 'envService', 'environment', function (envService, environment) {
    envService.set(environment.PROD);

    this.apiUrl = function () {
      return envService.read('oqfazerUrl');
    };
  }]);
}());
