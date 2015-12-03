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
                '$http', '$mdToast', '$element',
                SettingsController
            ]);

    /**
     * Controller for the Settings page
     * @param $http
     * @param $mdToast
     * @constructor
     */
    function SettingsController($http, $mdToast, $element) {
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
            $element.bind("keyup", function (evt) {
                self.search(true);
            });
        })();

        function getCities() {
            var citiesSaved = localStorage.getItem('cities');
            if (citiesSaved != null) {//&& != undefined
                self.cities = JSON.parse(citiesSaved);
            } else {
                self.cities = [
                    {
                        'id': 2992166,
                        'name': 'Montpellier, FR'
                    },
                    {
                        'id': 0,
                        'name': 'Strasbourg, Canada'
                    },
                    {
                        'id': 2184707,
                        'name': 'Wanaka, New Zealand'
                    }
                ];
            }
        }

        function save() {
            localStorage.setItem('cities', JSON.stringify(self.cities));
        }

        function search(searchInProgress) {
            var reqParams = {
                'params': {
                    'q': self.citySearch,
                    'appid': '5c8f3d5b713b4a18a56825b420a691d0'
                }
            };
            if (searchInProgress) {
                reqParams.params.type = 'like';
            } else {
                reqParams.params.type = 'accurate';
            }
            $http.get('http://api.openweathermap.org/data/2.5/find', reqParams)
                    .success(function (response) {
                        self.citiesSearched = response.list;
                        if ((response.list == null && self.citySearch.length > 0) || (response.list != null && response.list.length === 0 && self.citySearch.length > 0)) {//& != undefined
                            self.citiesSearched = [{
                                    'id': '-1',
                                    'name': 'NO RESULTS'
                                }];
                        }
                    })
                    .catch(function (err) {
                        $mdToast.showSimple('Error, no connection !');
                    });
        }

        function add(city) {
            var name = cityDisplayName(city);
            var duplicate = false;
            self.cities.forEach(function (elt) {
                var eltName = cityDisplayName(elt);
                if (elt.id === city.id && eltName === name) {
                    duplicate = true;
                    $mdToast.showSimple('This city is already in your list !');
                    return;
                }
            });
            if (!duplicate) {
                self.cities.push(
                        {
                            'id': city.id,
                            'name': name
                        }
                );
                localStorage.setItem('cities', JSON.stringify(self.cities));
            }
        }

        function cityDisplayName(city) {
            var name = "";
            if (city.sys != null && city.sys.country != null && city.sys.country !== '') {//& != undefined
                name = city.name + ', ' + city.sys.country;
            } else {
                name = city.name;
            }
            return name;
        }
    }

})();
