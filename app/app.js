(function () {
    'use strict';

    /**
     * Declare app level module
     * 
     */
    angular.module('weatherApp', [
        'ui.router'
    ])
            .config(['$urlRouterProvider', '$stateProvider',
                function ($urlRouterProvider, $stateProvider) {

                    $urlRouterProvider.otherwise('/home');

                    $stateProvider
                            // HOME STATE ======================================
                            .state('home', {
                                url: '/home'
                            })

                            // SETTINGS PAGE  ==================================
                            .state('settings', {
                                url: '/settings'
                            });
                }]).controller('AppController', [AppController]);

    /**
     * Main Controller for the Angular Material Starter App
     * @constructor
     */
    function AppController() {
        var self = this;

    }
})();