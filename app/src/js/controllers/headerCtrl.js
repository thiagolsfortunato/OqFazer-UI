/**
 * Created by Diego Hideky on 15/08/17.
 * Email: <diego.hideky@fotosensores.com>
 */

(function () {
    'use strict';

    angular.module('app')
        .controller('headerCtrl', ['$scope', '$location', 'authUser', '$state', 'loginService', 'eventService', 'userService', function ($scope, $location, authUser, $state, loginService, eventService, userService ) {

            var KEY_LOGGED = 'logged';
            var KEY_SESSION = 'sessionId';
            var KEY_STORAGE = 'token';
            var user = authUser.getUser();

            $scope.isAdmin = loginService.isAdmin(user);
            $scope.user = angular.copy(user);
            $scope.logged = authUser.isLogged();

            if($scope.logged) $scope.username = user.username;

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

            $scope.myEvents =  function (user) {
                eventService.myEvents(user);
            };

            $scope.myParticipation =  function (user) {
                eventService.myParticipation(user);
            };

            $scope.myProfile = function (user) {
                userService.myProfile(user);
            };

            $scope.logOut = function () {
                $scope.hideSideNav();
                StorageHelper.removeItem(KEY_LOGGED);
                StorageHelper.removeItem(KEY_SESSION);
                StorageHelper.removeItem(KEY_STORAGE);
                authUser.removeCookies();
                location.reload(true);
                $location.path('/');
            };
        }]);
}());