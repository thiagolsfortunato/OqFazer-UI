(function () {
    'use strict';
    angular.module('app').controller('loginCtrl', ['$scope', '$location', 'authUser', 'loginService', 'toastr',
        function ($scope, $location, authUser, loginService, toastr) {

                var KEY_STORAGE = 'token';
                $("body").addClass('oqfazer-background');

                StorageHelper.setItem("previous_page", "login");
                StorageHelper.setItem("logged", false);
                $scope.entry = {};

                $scope.submitLoginForm = function () {
                    if ($scope.form.$valid) {
                        loginService.login($scope.entry)
                            .then(function (data) {
                                authUser.setUser(data);
                                authUser.setLogged(true);
                                toastr.success("Login realizado com sucesso!", {timeOut: 900});
                                $location.path('/events');
                            }).catch(function (error) {
                            if (error.status === 401) {
                                toastr.error('Usuário ou Senha Inválido!', {timeOut: 900});
                                $scope.entry.password = "";
                            } else {
                                $scope.entry.password = "";
                                $scope.entry.password = "";
                                toastr.error('Falha no login', {timeOut: 900});
                                console.log(error);
                            }
                        });
                    }
                };

                function isLogged() {
                    if (authUser.isLogged()) {
                        $location.path('/events');
                    } else {
                        StorageHelper.removeItem(KEY_STORAGE);
                        authUser.setLogged(false);
                    }
                }

                isLogged();

            }]);
}());