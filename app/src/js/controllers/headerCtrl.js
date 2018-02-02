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

            $scope.user = angular.copy(user);
            $scope.logged = authUser.isLogged();

            $scope.isAdmin = loginService.isAdmin(user);
            if($scope.logged) $scope.username = user.username;

            $(document).ready(function(){
                $('.dropdown-button').dropdown();
            });

            $scope.myEvents =  function () {
                eventService.myEvents(user);
            };

            $scope.myParticipations =  function () {
                eventService.myParticipations(user);
            };

            $scope.myProfile = function () {
                userService.myProfile(user);
            };

            $scope.isLogged = function () {
                return authUser.isLogged();
            };

            $scope.logOut = function () {
                StorageHelper.removeItem(KEY_LOGGED);
                StorageHelper.removeItem(KEY_SESSION);
                StorageHelper.removeItem(KEY_STORAGE);
                location.reload(true);
                $location.path('/');
            };
        }]);
}());