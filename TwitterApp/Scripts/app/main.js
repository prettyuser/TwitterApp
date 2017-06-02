'use strict';

(function (ng) {
    ng
        .module('app', ['ui.router'])
        .config([
            '$stateProvider', '$urlRouterProvider', '$locationProvider',
            function ($stateProvider, $urlRouterProvider, $locationProvider) {
                $locationProvider.html5Mode(true);
                $locationProvider.hashPrefix('#');
                $stateProvider
                    .state('root',
                    {
                        url: '/',
                        controller: 'root.controller',
                        templateUrl: '/scripts/app/views/root.html'
                    });
                $urlRouterProvider.otherwise('/');
            }
        ]);
})(angular)