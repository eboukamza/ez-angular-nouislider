angular.module('ez.nouislider', [])
    .directive('ezSlider', function () {
        'use strict';
        var setTooltipTpl = function (elem, value, tooltipOptions) {
            angular.element(elem).html(
                '<strong>' + tooltipOptions.label + '</strong>' +
                '<span>' + value + tooltipOptions.postfix + '</span>'
            );
        };

        return {
            restrict: 'E',
            replace: true,
            scope: {
                from: '=from',
                to: '=to',
                step: '=step',
                options: '=',
                ngModel: '='

            },
            template: '<div></div>',
            link: function (scope, elem, attr) {
                var slider = angular.element(elem);
                slider.noUiSlider({
                    start: [scope.ngModel[0], scope.ngModel[1]],
                    connect: true,
                    margin: parseFloat(attr.step),
                    step: parseFloat(attr.step),
                    range: {
                        'min': [parseFloat(attr.from)],
                        'max': [parseFloat(attr.to)]
                    }
                });

                if (scope.options && scope.options.tooltip) {
                    var tooltipOptions = scope.options.tooltip;
                    slider.Link('upper').to('-inline-<div class="' + tooltipOptions.tooltipClass + '"></div>', function (value) {
                        setTooltipTpl(this, value, tooltipOptions);
                    });

                    slider.Link('lower').to('-inline-<div class="slider-tooltip"></div>', function (value) {
                        setTooltipTpl(this, value, tooltipOptions);
                    });

                }

                if (scope.options && scope.options.pips) {
                    var pipsOptions = scope.options.pips;
                    slider.noUiSlider_pips({
                        mode: 'count',
                        values: pipsOptions.values,
                        density: pipsOptions.density,
                        stepped: true,
                        format: wNumb({
                            decimals: pipsOptions.decimals,
                            postfix: pipsOptions.postfix
                        })
                    });
                }


                slider.on('set', function (event, val) {
                    if (!scope.$$phase && !scope.$root.$$phase) {
                        scope.$apply(function () {
                            scope.ngModel[0] = parseFloat(val[0]);
                            scope.ngModel[1] = parseFloat(val[1]);
                        });
                    }
                });

                scope.$watch('ngModel[0]', function (newVal) {
                    newVal = parseFloat(newVal);
                    slider.val([newVal, null]);
                });

                scope.$watch('ngModel[1]', function (newVal) {
                    newVal = parseFloat(newVal);
                    slider.val([null, newVal]);
                });
            }
        };
    });
