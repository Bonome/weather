(function () {
    'use strict';

    /**
     * Declare app level module
     * 
     */
    angular.module('weatherApp', [
        'ngMaterial',
        'ui.router',
        'home',
        'settings'
    ])
            .config(['$mdThemingProvider', '$urlRouterProvider', '$stateProvider',
                function ($mdThemingProvider, $urlRouterProvider, $stateProvider) {

                    $urlRouterProvider.otherwise('/home');

                    $stateProvider
                            // HOME STATE ======================================
                            .state('home', {
                                url: '/home',
                                templateUrl: './components/home/view/home.html',
                                controller: 'HomeController',
                                controllerAs: 'home'
                            })

                            // SETTINGS PAGE  ==================================
                            .state('settings', {
                                url: '/settings',
                                templateUrl: './components/settings/view/settings.html',
                                controller: 'SettingsController',
                                controllerAs: 'settings'
                            });

                    var customPrimary = {
                        '50': '#8e9397',
                        '100': '#80868b',
                        '200': '#74797e',
                        '300': '#676d71',
                        '400': '#5b6063',
                        '500': '#4f5356',
                        '600': '#434649',
                        '700': '#37393b',
                        '800': '#2a2d2e',
                        '900': '#1e2021',
                        'A100': '#9ba0a3',
                        'A200': '#a8acaf',
                        'A400': '#b6b9bb',
                        'A700': '#121314',
                        'contrastDefaultColor': 'light',
                        'contrastDarkColors': '50 100 200',
                        'contrastStrongLightColors': '300 400'
                    };
                    $mdThemingProvider
                            .definePalette('customPrimary',
                                    customPrimary);

                    var customAccent = {
                        '50': '#d3ee81',
                        '100': '#cbea6a',
                        '200': '#c3e754',
                        '300': '#bbe43e',
                        '400': '#b3e127',
                        '500': '#a5d21d',
                        '600': '#93bc1a',
                        '700': '#82a517',
                        '800': '#708f14',
                        '900': '#5f7811',
                        'A100': '#daf197',
                        'A200': '#e2f4ae',
                        'A400': '#eaf7c4',
                        'A700': '#4d620e'
                    };
                    $mdThemingProvider
                            .definePalette('customAccent',
                                    customAccent);

                    var customWarn = {
                        '50': '#fbd8ca',
                        '100': '#f9c6b2',
                        '200': '#f7b49b',
                        '300': '#f5a383',
                        '400': '#f3916c',
                        '500': '#F18054',
                        '600': '#ef6e3c',
                        '700': '#ed5d25',
                        '800': '#e64e13',
                        '900': '#ce4611',
                        'A100': '#fde9e1',
                        'A200': '#fffbf9',
                        'A400': '#ffffff',
                        'A700': '#b73e0f'
                    };
                    $mdThemingProvider
                            .definePalette('customWarn',
                                    customWarn);

                    $mdThemingProvider.theme('default')
                            .primaryPalette('customPrimary')
                            .accentPalette('customAccent')
                            .warnPalette('customWarn');

                    $mdThemingProvider.theme('delete-toast');
                }]).controller('AppController', ['$state', AppController]);

    /**
     * Main Controller for the Angular Material Starter App
     * @constructor
     */
    function AppController($state) {
        var self = this;

        self.goHome = goHome;
        self.goSettings = goSettings;

        function goHome() {
            $state.go('home');
        }

        function goSettings() {
            $state.go('settings');
        }
    }
})();