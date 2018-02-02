(function () {
    'use strict';

    angular.module('app')
        .controller('categoryCtrl', ['$scope', '$timeout', '$interval', 'toastr', 'SweetAlert', 'categoryService', 'authUser', '$location',
            function ($scope, $timeout, $interval, toastr, SweetAlert, categoryService, authUser, $location) {

                $("body").addClass('login-backgroung');

                $scope.categories = [];
                $scope.category = {};
                $scope.categoryForm = false;

                $scope.saveCategory = function () {
                    if ($scope.form.$valid) {
                        categoryService.saveCategory($scope.category).then(function (res) {
                            if (res.status === 201) {
                                $scope.category = res.data;
                                toastr.success('Salvo com sucesso', {timeOut: 900});
                            } else if (res.status === 200) {
                                toastr.success('Editado com sucesso', {timeOut: 900});
                            } else {
                                toastr.error('Não foi possível salvar o usuário', {timeOut: 900});
                            }
                        }).catch(function (res) {
                            if (res.status === 409) {
                                toastr.error('Categoria Existente!', {timeOut: 900});
                            }
                        })
                    }
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
                            userService.deleteCategory(category).then(function (res) {
                                if (res.status === 200) {
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
                        categoryService.getCategoryByName(category.name).then(function (category) {
                            if (category.status === 200) {
                                $scope.category = category.data;
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
                    categoryService.getAllCategories().then(function (categories) {
                        var categoryList = [];
                        categories.forEach(function (category) {
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

                function clearForm() {
                    $scope.form = {};
                    $scope.category = {};
                }

            }]);
}());