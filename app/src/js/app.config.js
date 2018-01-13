(function () {
  'use strict';

  angular.module('app').config(['envServiceProvider', '$httpProvider', function (envServiceProvider, $httpProvider, interceptor) {

    envServiceProvider.config({
      vars: {
        production: {
          oqfazerUrl: 'http://'+ location.host
        },
        development: {
          oqfazerUrl: 'http://' + location.host.substring(0, location.host.lastIndexOf(":")) + ':8080'
        }
      }
    });

    envServiceProvider.check();

    $httpProvider.interceptors.push('interceptor');

  }]);
}());
