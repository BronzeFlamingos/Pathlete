'use strict';

/**
 * @ngdoc function
 * @name pathleteApp.controller:ToolbarCtrl
 * @description
 * # MainCtrl
 * Controller of the pathleteApp toolbar
 */
app.controller('ToolbarCtrl', function ($scope, $http, Info) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    //user info
    $scope.thing='stuff';

    $scope.logout = function(){
      Info.logout();
    }
  });