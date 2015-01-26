'use strict';

/**
 * @ngdoc function
 * @name pathleteApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the pathleteApp
 */
angular.module('pathleteApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
