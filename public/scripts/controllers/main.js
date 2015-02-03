'use strict';

/**
 * @ngdoc function
 * @name pathleteApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the pathleteApp
 * enusres toolbar is off for login page
 */


app.controller('MainCtrl', function ($scope, $http, Tool) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    //turns toolbar off
    Tool.toolbarOff();

  });
