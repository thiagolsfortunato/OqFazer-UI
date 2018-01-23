/**
 * Created by Diego Hideky on 15/08/17.
 * Email: <diego.hideky@fotosensores.com>
 */

(function () {
    'use strict';

    angular.module('app')
        .controller('headerCtrl', ['$scope', '$location', 'authUser', '$state', function ($scope, $location, authUser, $state) {

            var KEY_LOGGED = 'logged';
            var KEY_SESSION = 'sessionId';
            var KEY_STORAGE = 'token';
            $scope.logged = authUser.isLogged();

            $(document).ready(function () {
                $(".button-collapse").sideNav();

                $('.collapsible').collapsible();
            });

            $scope.showSideNav = function () {
                $('.button-collapse').sideNav('show');
            };

            $scope.hideSideNav = function () {
                $('.button-collapse').sideNav('hide');
            };

            $scope.selectMenu = function (select) {
                if (typeof select === "undefined") {
                    var select = $state.current.name.split('.')[1];
                }
            };

            $scope.selectMenu();

            var user = authUser.getUser();
            if (typeof  user !== 'undefined' && user.hasOwnProperty('authority') && user !== null) {
                $scope.isAdmin = user.authority === "ROLE_ADMIN";
                $scope.username = user.username;
            }

            $scope.logOut = function () {
                var parsed = JSON.stringify({
                    sessionId: StorageHelper.getItem(KEY_SESSION)
                });

                $scope.hideSideNav();
                StorageHelper.removeItem(KEY_LOGGED);
                StorageHelper.removeItem(KEY_SESSION);
                StorageHelper.removeItem(KEY_STORAGE);
                authUser.removeCookies();
                $location.path('/');
            };
        }]);
}());