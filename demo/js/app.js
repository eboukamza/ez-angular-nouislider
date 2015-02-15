angular.module('demo', ['ez.nouislider'])
    .controller('sliderController', function ($scope, $timeout, $compile, $element) {
        'use strict';
        $scope.values = [300, 500];

        $timeout(function () {
            $scope.values = [400, 450];
            var sliderElem = createSlider('values', 200, 600, 10);
            var elem = $element.find('#idSlider');
            elem.append(sliderElem);
        }, 1000);

        function createSlider(model, from, to, step) {
            return $compile('<ez-slider ' +
            'ng-model="' + model + '" ' +
            'from="' + from + '" ' +
            'to="' + to + '" ' +
            'step="' + step + '"> ' +
            '</ez-slider>')($scope);
        }

        $element.find("#slider-start").noUiSlider({
             start: [200, 600],
                 connect: true,
                 margin:10,
                 step:10,
                 range: {
                 'min': [ 200 ],
                     'max': [ 600 ]
               }
           });

    });
