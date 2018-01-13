/**
 * Created by Thiago Fortunato.
 * Email: <thiagolsfortunato@hotmail.com>
 */

(function () {
    'use strict';

    angular.module('app')
        .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
            $urlRouterProvider.otherwise("/login");
            $stateProvider
                .state('login', {
                    url: "/login",
                    templateUrl: "views/login.html",
                    controller: "loginCtrl"
                })
                .state('home', {
                    abstract: true,
                    url: "",
                    templateUrl: "views/home.html"
                })
                .state('home.menu', {
                    url: "/menu",
                    templateUrl: "views/pages/menu.html",
                    controller: "menuCtrl"
                })
                .state('home.user', {
                    url: "/user",
                    templateUrl: "views/pages/user.html",
                    controller: "userCtrl"
                })
                .state('home.category', {
                    url: "/category",
                    templateUrl: "views/pages/category.html",
                    controller: "balanceCtrl"
                })
                .state('home.event', {
                    url: "/event",
                    templateUrl: "views/pages/event.html",
                    controller: "categoryCtrl"
                })
                .state('home.city', {
                    url: "/city",
                    templateUrl: "views/pages/city.html",
                    controller: "cityCtrl"
                })
                .state('home.region', {
                    url: "/region",
                    templateUrl: "views/pages/region.html",
                    controller: "regionCtrl"
                });
        }]);
}());
