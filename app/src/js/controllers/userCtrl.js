(function () {
    'use strict';

    angular.module('app')
        .controller('userCtrl', ['$scope', '$timeout', '$interval', 'toastr', 'SweetAlert', 'userService', 'authUser', 'loginService', '$location',
            function ($scope, $timeout, $interval, toastr, SweetAlert, userService, authUser, loginService, $location) {

                var KEY_STORAGE = 'token';
                var previous = StorageHelper.getItem("previous_page");
                var user = authUser.getUser();

                $scope.isEdit = 'salvar';
                $scope.account = {};
                $scope.user = {
                    authorities: "ROLE_USER",
                };

                if (previous !== "login") {
                    authUser.authorize();
                    $scope.isEdit = 'editar';
                }

                StorageHelper.setItem("previous_page", "user");

                this.getAllUsers();

                $scope.saveUser = function () {
                    if ($scope.form.$valid) {
                        userService.saveUser($scope.user).then(function (res) {
                            if (res.status === 201) {
                                $scope.user = res.data;
                                refreshToken(res.data);
                                toastr.success('Salvo com sucesso', {timeOut: 900});
                            } else if (res.status === 200) {
                                refreshToken(res.data);
                                toastr.success('Editado com sucesso', {timeOut: 900});
                            } else {
                                toastr.error('Não foi possível salvar o usuário', {timeOut: 900});
                            }
                        }).catch(function (res) {
                            if (res.status === 409) {
                                toastr.error('Usuário Existente!', {timeOut: 900});
                            }
                        })
                    }
                };

                $scope.deleteProfile = function () {
                    SweetAlert.swal({
                        title: 'Remover?',
                        text: 'Este registro será removido permanentemente.',
                        type: 'warning',
                        showCancelButton: true,
                        confirmButtonColor: '#DD6B55',
                        confirmButtonText: 'Sim',
                        cancelButtonText: 'Cancelar',
                        closeOnConfirm: true
                    }, function (isConfirm) {
                        if (isConfirm) {
                            $scope.user.username = user.username;
                            userService.deleteUser($scope.user).then(function (res) {
                                if (res.status === 200) {
                                    logout();
                                    toastr.success('Usuário deletado com sucesso', {timeOut: 900});
                                } else {
                                    toastr.error('Não foi possível deletar o usuário', {timeOut: 900});
                                }
                            }).catch(function (res) {
                                if (res.status === 404) {
                                    toastr.error('Usuário não encontrado', {timeOut: 900});
                                }
                            });
                        }
                    });
                };


            }]);
}());
