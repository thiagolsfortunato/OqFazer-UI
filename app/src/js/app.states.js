/**
 * Created by Thiago Fortunato.
 * Email: <thiagolsfortunato@hotmail.com>
 */

(function () {
    'use strict';

    angular.module('app')
        .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
            $urlRouterProvider.otherwise("/events");
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
                .state('home.user', {
                    url: "/user",
                    templateUrl: "views/pages/user.html",
                    controller: "userCtrl"
                })
                .state('home.category', {
                    url: "/category",
                    templateUrl: "views/pages/category.html",
                    controller: "categoryCtrl"
                })
                .state('home.event', {
                    url: "/event",
                    templateUrl: "views/pages/event.html",
                    controller: "eventCtrl"
                })
                .state('home.events', {
                    url: "/events",
                    templateUrl: "views/pages/event.html",
                    controller: "eventCtrl"
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
