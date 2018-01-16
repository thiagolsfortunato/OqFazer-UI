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
                $scope.users = [];
                $scope.user = {
                    authorities: "ROLE_ADMIN",
                };

                if (previous !== "login") {
                    authUser.authorize();
                    $scope.isEdit = 'editar';
                }

                StorageHelper.setItem("previous_page", "user");

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

                $scope.deleteUser = function (user) {
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
                            userService.deleteUser(user).then(function (res) {
                                if (res.status === 200) {
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

                $scope.getUserByName = function (user) {
                    if (typeof user !== "undefined") {
                        userService.getUserByName(user.name).then(function (user) {
                            if (user.status === 200) {
                                $scope.user = user.data;
                                $scope.user.password = "";
                                toastr.success('Usuário carregado com Sucesso', {timeOut: 900});
                            }
                        }).catch(function (user) {
                            if (user.status === 404) {
                                toastr.error('Usuário não encontrado', {timeOut: 900});
                            }
                        });
                    }
                };

                function getAllUsers() {
                    userService.getAllUsers().then(function (users) {
                        var userList = [];
                        users.forEach(function (user) {

                            var toShowUser = angular.copy(user);
                            toShowUser.loged = isLoggedUser(user);
                            toShowUser.toShowRole = toShowRole(user);
                            userList.push(toShowUser);

                        });
                        $scope.users = userList;
                    }).catch(function () {
                        toastr.error('Ocorreu um problema ao carregar os usuários', {timeOut: 900});
                    });
                }

                getAllUsers();

                $scope.back = function () {
                    $location.path('/menu');
                };

                $scope.logout = function () {
                    StorageHelper.removeItem(KEY_STORAGE);
                    authUser.setLogged(false);
                    authUser.removeCookies();
                    user = "";
                    $location.path('/');
                }

            }]);
}());
