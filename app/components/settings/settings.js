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
            .module('settings', [])
            .controller('SettingsController', [
                '$http', '$mdToast',
                SettingsController
            ]);

    /**
     * Controller for the Settings page
     * @param $http
     * @param $mdToast
     * @constructor
     */
    function SettingsController($http, $mdToast) {
        var self = this;

        self.cities = [];
        self.citiesSearched = [];
        self.citySearch = "";

        self.getCities = getCities;
        self.save = save;
        self.search = search;
        self.add = add;

        (function init() {
            if (self.cities.length <= 0) {
                self.getCities();
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

        function save() {
            localStorage.setItem('cities', JSON.stringify(self.cities));
        }

        function search() {
            $http.get('http://api.openweathermap.org/data/2.5/find?q=' + self.citySearch + '&type=accurate&appid=5c8f3d5b713b4a18a56825b420a691d0')
                    .success(function (response) {
                        self.citiesSearched = response.list;
                    }).catch(function (err) {
                $mdToast.showSimple('Error, no connection !');
            });
        }

        function add(city) {
            self.cities.push(
                    {
                        'id': city.id,
                        'name': city.name
                    }
            );
            localStorage.setItem('cities', JSON.stringify(self.cities));
        }
    }

})();
