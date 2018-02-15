(function () {
    'use strict';

    angular.module('app')
        .controller('regionCtrl', ['$scope', '$timeout', '$interval', 'toastr', 'SweetAlert', 'regionService', 'utils',
            function ($scope, $timeout, $interval, toastr, SweetAlert, regionService, utils) {

                $("body").addClass('oqfazer-background');

                $scope.regions = [];
                $scope.region = {};
                $scope.regionForm = false;
                $scope.isEdit = false;

                $scope.saveRegion = function () {
                    if ($scope.form.$valid) {
                        regionService.saveRegion($scope.region).then(function (res) {
                            if (res.status === 201) {
                                $scope.regions.push(res.data);
                                toastr.success('Salvo com sucesso', {timeOut: 900});
                            } else if (res.status === 200) {
                                var position = utils.findPosition($scope.regions, res.data.id);
                                $scope.regions[position] = res.data;
                                toastr.success('Editado com sucesso', {timeOut: 900});
                            } else {
                                toastr.error('Não foi possível salvar a região', {timeOut: 900});
                            }
                        }).catch(function (res) {
                            if (res.status === 409) {
                                toastr.error('Região ou Cidade já cadastrada!', {timeOut: 900});
                            }
                        }).finally(function () {
                            $scope.closeRegionForm();
                        })
                    }
                };

                $scope.editRegion = function (region) {
                    $scope.isEdit = true;
                    $scope.regionForm = true;
                    $scope.region = angular.copy(region);
                };

                $scope.deleteRegion = function (region) {
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
                            regionService.deleteRegion(region).then(function (res) {
                                if (res.status === 200) {
                                    $scope.regions.splice($scope.regions.indexOf(region), 1);
                                    toastr.success('Categoria deletada com sucesso', {timeOut: 900});
                                } else {
                                    toastr.error('Não foi possível deletar a categoria', {timeOut: 900});
                                }
                            }).catch(function (res) {
                                if (res.status === 404) {
                                    toastr.error('Categoria não encontrada', {timeOut: 900});
                                }
                            });
                        }
                    });
                };

                $scope.getRegionByName = function (region) {
                    if (typeof region !== "undefined") {
                        regionService.getRegionByName(region.name).then(function (res) {
                            if (region.status === 200) {
                                $scope.region = res.data;
                                toastr.success('Região carregada com Sucesso', {timeOut: 900});
                            }
                        }).catch(function (res) {
                            if (res.status === 404) {
                                toastr.error('Região não encontrada', {timeOut: 900});
                            }
                        });
                    }
                };

                function getAllRegions() {
                    regionService.getAllRegions().then(function (res) {
                        var regionList = [];
                        res.data.forEach(function (region) {
                            console.log(region);
                            regionList.push(region);
                        });
                        $scope.regions = regionList;
                    }).catch(function () {
                        toastr.error('Ocorreu um problema ao carregar as categorias', {timeOut: 900});
                    });
                }

                getAllRegions();

                $scope.showRegionForm = function () {
                    clearForm();
                    $scope.regionForm = true;
                };

                $scope.closeRegionForm = function () {
                    $scope.regionForm = false;
                };

                function clearForm() {
                    $scope.region = {};
                    $scope.form.$setPristine();
                }

            }]);
}());