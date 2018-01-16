(function () {
    'use strict';

    angular.module('app')
        .controller('cityCtrl', ['$scope', '$timeout', '$interval', 'toastr', 'SweetAlert', 'cityService', 'authUser', '$location',
            function ($scope, $timeout, $interval, toastr, SweetAlert, cityService, authUser, $location) {

                $scope.cities = [];
                $scope.city = {};

                $scope.saveCity = function () {
                    if ($scope.form.$valid) {
                        cityService.saveCity($scope.city).then(function (res) {
                            if (res.status === 201) {
                                $scope.city = res.data;
                                toastr.success('Salvo com sucesso', {timeOut: 900});
                            } else if (res.status === 200) {
                                toastr.success('Editado com sucesso', {timeOut: 900});
                            } else {
                                toastr.error('Não foi possível salvar o usuário', {timeOut: 900});
                            }
                        }).catch(function (res) {
                            if (res.status === 409) {
                                toastr.error('Cidade Existente!', {timeOut: 900});
                            }
                        })
                    }
                };

                $scope.deleteCity = function (city) {
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
                            userService.deleteCity(city).then(function (res) {
                                if (res.status === 200) {
                                    toastr.success('Cidade deletada com sucesso', {timeOut: 900});
                                } else {
                                    toastr.error('Não foi possível deletar a cidade', {timeOut: 900});
                                }
                            }).catch(function (res) {
                                if (res.status === 404) {
                                    toastr.error('Cidade não encontrada', {timeOut: 900});
                                }
                            });
                        }
                    });
                };

                $scope.getCityByName = function (city) {
                    if (typeof city !== "undefined") {
                        cityService.getCityByName(city.name).then(function (city) {
                            if (city.status === 200) {
                                $scope.city = city.data;
                                toastr.success('Cidade carregada com Sucesso', {timeOut: 900});
                            }
                        }).catch(function (categoria) {
                            if (categoria.status === 404) {
                                toastr.error('Cidade não encontrada', {timeOut: 900});
                            }
                        });
                    }
                };

                function getAllCities() {
                    cityService.getAllCategories().then(function (cities) {
                        var cityList = [];
                        cities.forEach(function (city) {
                            cityList.push(city);
                        });
                        $scope.categories = cityList;
                    }).catch(function () {
                        toastr.error('Ocorreu um problema ao carregar as cidades', {timeOut: 900});
                    });
                }

                getAllCities();

                $scope.back = function () {
                    $location.path('/menu');
                };

            }]);
}());