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
     * @param $element
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
        self.addCity = addCity;
        self.deleteCity = deleteCity;

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
                        var toast = $mdToast.simple()
                                .content('Error, no network connection !')
                                .position('top right')
                                .hideDelay(10000)
                                .theme("delete-toast");
                        $mdToast.show(toast);
                    });
        }

        function addCity(city) {
            var name = cityDisplayName(city);
            var duplicate = false;
            self.cities.forEach(function (elt) {
                var eltName = cityDisplayName(elt);
                if (elt.id === city.id && eltName === name) {
                    duplicate = true;
                    var toast = $mdToast.simple()
                            .content('This city is already in your list !')
                            .position('top right')
                            .hideDelay(10000)
                            .theme("delete-toast");
                    $mdToast.show(toast);
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
                self.citySearch = "";
                self.citiesSearched = [];
            }
        }

        function deleteCity(id, name) {
            if (id === 0 || id === '0') {
                self.cities.forEach(function (city, index) {
                    if (city.name === name) {
                        self.cities.splice(index, 1);
                        localStorage.setItem('cities', JSON.stringify(self.cities));
                        showConfirmDelete(city, index);
                    }
                });
            } else {
                self.cities.forEach(function (city, index) {
                    if (city.id === id) {
                        self.cities.splice(index, 1);
                        localStorage.setItem('cities', JSON.stringify(self.cities));
                        showConfirmDelete(city, index);
                    }
                });
            }
        }

        function showConfirmDelete(city, index) {
            var toast = $mdToast.simple()
                    .content('You just delete the city of ' + city.name + '. Do you want to revert this city ?')
                    .action('Revert')
                    .highlightAction(true)
                    .position('top right')
                    .hideDelay(20000)
                    .theme("delete-toast");
            $mdToast.show(toast).then(function (response) {
                if (response === 'ok') {
                    self.cities.splice(index, 0, city);
                    localStorage.setItem('cities', JSON.stringify(self.cities));
                }
            });
        }
        ;

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
