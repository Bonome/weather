/* 
 * The MIT License
 *
 * Copyright 2015 bonome.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

(function () {

    angular
            .module('home', [])
            .controller('HomeController', [
                '$http', '$log', '$state', '$mdToast',
                HomeController
            ]);

    /**
     * Controller for the Home page
     * @param $http
     * @param $log
     * @param $state
     * @param $mdToast
     * @constructor
     */
    function HomeController($http, $log, $state, $mdToast) {
        var self = this;

        self.cities = [];

        self.getCities = getCities;
        self.updateWeather = updateWeather;

        (function init() {
            if (self.cities.length <= 0) {
                self.getCities();
                self.updateWeather();
            }
        })();

        function getCities() {
            var citiesSaved = localStorage.getItem('cities');
            if (citiesSaved != null) {//&& != undefined
                self.cities = JSON.parse(citiesSaved);
            } else {
                self.cities = [
                    {
                        'id': '2992166',
                        'name': 'Montpellier'
                    },
                    {
                        'id': '2973783',
                        'name': 'Strasbourg'
                    }
                ];
            }
        }

        function updateWeather() {
            self.cities.forEach(function (city) {
                var reqParam = {
                    'params': {
                        'appid': '5c8f3d5b713b4a18a56825b420a691d0',
                        'lang': 'en',
                        'units': 'metric'
                    }
                };
                if (city.id !== 0) {
                    reqParam.params.id = city.id;
                } else {
                    reqParam.params.q = city.name;
                }
                $http.get('http://api.openweathermap.org/data/2.5/weather', reqParam)
                        .success(function (cityWeather) {
                            processOmwData(city, cityWeather);
                        })
                        .catch(function (err) {
                            $log.error(err);
                            $mdToast.showSimple('Error, no connection !');
                        });
            });
        }
    }

    function processOmwData(city, cityWeather) {
        if (cityWeather.sys != null) {// && != undefined
            if (cityWeather.dt > cityWeather.sys.sunrise && cityWeather.dt < cityWeather.sys.sunset) {
                city.moment = '-day';
            } else {
                city.moment = '-night';
            }
        } else {
            city.moment = '';
        }
        if (Array.isArray(cityWeather.weather) && cityWeather.weather[0] != null) {// & != undefined
            city.weather = '-' + cityWeather.weather[0].id;
            city.desc = cityWeather.weather[0].description;
        } else {
            city.weather = ' wi-alien';
            city.desc = 'Error retrieving weather info !';
        }
        if (cityWeather.main != null) {// & != undefined
            city.temp = cityWeather.main.temp + '°C';
        } else {
            city.temp = '';
        }
    }
})();