(function () {
    'use strict';

    angular.module('app')
        .controller('categoryCtrl', ['$scope', '$timeout', '$interval', 'toastr', 'SweetAlert', 'categoryService','utils',
            function ($scope, $timeout, $interval, toastr, SweetAlert, categoryService, utils) {

                $("body").addClass('oqfazer-background');

                $scope.categories = [];
                $scope.category = {};
                $scope.categoryForm = false;
                $scope.isEdit = false;

                $scope.saveCategory = function () {
                    if ($scope.form.$valid) {
                        categoryService.saveCategory($scope.category).then(function (res) {
                            if (res.status === 201) {
                                $scope.categories.push(res.data);
                                toastr.success('Salvo com sucesso', {timeOut: 900});
                            } else if (res.status === 200) {
                                var position = utils.findPosition($scope.categories, res.data.id);
                                $scope.categories[position] = res.data;
                                toastr.success('Editado com sucesso', {timeOut: 900});
                            } else {
                                toastr.error('Não foi possível salvar a categoria', {timeOut: 900});
                            }
                        }).catch(function (res) {
                            if (res.status === 409) {
                                toastr.error('Categoria já cadastrada!', {timeOut: 900});
                            }
                        }).finally(function () {
                            $scope.closeCategoryForm();
                        })
                    }
                };

                $scope.editCategory = function (category) {
                    $scope.isEdit = true;
                    $scope.categoryForm = true;
                    $scope.category = angular.copy(category);
                };


                $scope.deleteCategory = function (category) {
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
                            categoryService.deleteCategory(category).then(function (res) {
                                if (res.status === 200) {
                                    $scope.categories.splice($scope.categories.indexOf(category), 1);
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

                $scope.getCategoryByName = function (category) {
                    if (typeof category !== "undefined") {
                        categoryService.getCategoryByName(category.name).then(function (res) {
                            if (category.status === 200) {
                                $scope.category = res.data;
                                toastr.success('Categoria carregada com Sucesso', {timeOut: 900});
                            }
                        }).catch(function (categoria) {
                            if (categoria.status === 404) {
                                toastr.error('Categoria não encontrada', {timeOut: 900});
                            }
                        });
                    }
                };

                function getAllCategories() {
                    categoryService.getAllCategories().then(function (res) {
                        var categoryList = [];
                        res.data.forEach(function (category) {
                            categoryList.push(category);
                        });
                        $scope.categories = categoryList;
                    }).catch(function () {
                        toastr.error('Ocorreu um problema ao carregar as categorias', {timeOut: 900});
                    });
                }

                getAllCategories();

                $scope.showCategoryForm = function () {
                    clearForm();
                    $scope.categoryForm = true;
                };

                $scope.closeCategoryForm = function () {
                    $scope.categoryForm = false;
                };

                function clearForm() {
                    $scope.category = {};
                    $scope.form.$setPristine();
                }

            }]);
}());