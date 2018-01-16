(function () {
    'use strict';

    angular.module('app').service('categoryService', ['api', function (api) {

        this.saveCategory = function (category) {
            if (user.hasOwnProperty('id') && category.id) {
                return api.editCategory(category).then(function (res) {
                    return res;
                });
            } else {
                return api.saveCategory(category).then(function (res) {
                    return res;
                });
            }
        };

        this.deleteCategory = function (category) {
            return api.deleteCategory(category).then(function (res) {
                return res;
            });
        };

        this.getCategoryByName = function (name) {
            return api.getUserByName(name).then(function (res) {
                return res;
            });
        };

        this.getAllCategories = function () {
            return api.getAllCategories().then(function (res) {
                return res;
            })
        }

    }]);
}());