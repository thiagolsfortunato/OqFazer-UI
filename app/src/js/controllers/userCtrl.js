(function () {
    'use strict';

    angular.module('app')
        .controller('userCtrl', ['$scope', '$rootScope', '$timeout', 'toastr', 'SweetAlert', 'userService', 'authUser', 'loginService', '$location', 'utils',
            function ($scope, $rootScope, $timeout, toastr, SweetAlert, userService, authUser, loginService, $location, utils) {

                $("body").addClass('oqfazer-background');

                var KEY_STORAGE = 'token';
                var previous = StorageHelper.getItem("previous_page");
                var user = authUser.getUser();

                $scope.isAdmin = loginService.isAdmin(user);
                $scope.logged = authUser.isLogged();
                $scope.userForm = false;
                $scope.isEdit = 'salvar';
                $scope.users = [];

                $scope.user = {
                    authorities: "ROLE_USER"
                };

                if (previous !== "login") {
                    authUser.authorize();
                    $scope.isEdit = 'editar';

                }

                $scope.saveUser = function () {
                    if ($scope.form.$valid) {
                        userService.saveUser($scope.user).then(function (res) {
                            if (res.status === 201) {
                                $scope.users.push(res.data);
                                toastr.success('Salvo com sucesso', {timeOut: 900});
                                if(!$scope.logged) $location.path('/login');
                            } else if (res.status === 200) {
                                var position = utils.findPosition($scope.users, res.data.id);
                                if ($scope.user.loged) {
                                    loginService.refreshToken(res.data);
                                }
                                $scope.users[position] = res.data;
                                toastr.success('Editado com sucesso', {timeOut: 900});
                            } else {
                                toastr.error('Não foi possível salvar o usuário', {timeOut: 900});
                            }
                        }).catch(function (res) {
                            if (res.status === 409) {
                                $scope.user.username = "";
                                toastr.error('Username já cadastrado!', {timeOut: 900});
                            }
                        }).finally(function () {
                            $scope.closeUserForm();
                        })
                    }
                };

                $scope.editUser = function (user) {
                    $scope.isEdit = true;
                    $scope.userForm = true;
                    $scope.user = angular.copy(user);
                    $scope.user.password = "";
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
                                    $scope.users.splice($scope.users.indexOf(user), 1);
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
                    if(typeof user !== "undefined") {
                        userService.getAllUsers().then(function (users) {
                            if(users.status === 200) {
                                var userList = [];
                                users.data.forEach(function (user) {
                                    var toShowUser = angular.copy(user);
                                    toShowUser.loged = isLoggedUser(user);
                                    userList.push(toShowUser);
                                });
                                $scope.users = userList;
                            }
                        }).catch(function () {
                            toastr.error('Ocorreu um problema ao carregar os usuários', {timeOut: 900});
                        });
                    }
                }

                $scope.back = function () {
                    $location.path('/menu');
                };

                $scope.logout = function () {
                    StorageHelper.removeItem(KEY_STORAGE);
                    authUser.setLogged(false);
                    user = "";
                    $location.path('/');
                };

                if ($scope.logged && user.authority === "ROLE_ADMIN") getAllUsers();

                $scope.showUserForm = function () {
                    clearForm();
                    $scope.userForm = true;
                };

                $scope.closeUserForm = function () {
                    $scope.userForm = false;
                };

                function clearForm() {
                    $scope.user = {};
                    $scope.form.$setPristine();
                }

                function isLoggedUser(user) {
                    if (typeof authUser.getUser() !== 'undefined' && authUser.getUser() !== null) {
                        var loggedUser = authUser.getUser();
                        return user.username === loggedUser.username;
                    }
                    return false;
                }

            }]);
}());
