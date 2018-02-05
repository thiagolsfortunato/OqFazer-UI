(function () {
    'use strict';

    angular.module('app').controller('profileCtrl', ['$scope', 'toastr', 'userService', 'authUser', 'loginService',
        function ($scope, toastr, userService, authUser, loginService) {

            var user = authUser.getUser();

            userService.getUserByUsername(user.username).then(function (res) {
                if (res.status === 200) {
                    $scope.isEdit = true;
                    $scope.user = res.data;
                    $scope.user.password = "";
                }
            }).catch(function (res) {
                if (res.status === 404) {
                    toastr.error('Usuário não encontrado', {timeOut: 900});
                }
            });

            $scope.saveUser = function () {
                if ($scope.form.$valid) {
                    userService.saveUser($scope.user).then(function (res) {
                        if (res.status === 200) {
                            loginService.refreshToken(res.data);
                            toastr.success('Editado com sucesso', {timeOut: 900});
                        } else {
                            toastr.error('Não foi possível salvar o usuário', {timeOut: 900});
                        }
                    }).catch(function (res) {
                        if (res.status === 409) {
                            $scope.user.username = "";
                            toastr.error('Username já cadastrado!', {timeOut: 900});
                        }
                    });
                }
            }

        }]);
}());