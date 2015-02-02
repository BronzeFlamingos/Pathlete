'use strict';

/**
 * @ngdoc function
 * @name pathleteApp.controller:ToolbarCtrl
 * @description
 * # MainCtrl
 * Controller of the pathleteApp toolbar
 * sets the toolbar ng-show status to true or false
 */
app.controller('ToolbarCtrl', function ($scope, $http, $location, Tool) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    //sets showing to true or false
    $scope.showing = Tool.toolbarShow;

    //listens for when toolbar has been toggled, updates toolbar to show or hide based on results. Thing is a placeholder, update is whatever was passed into broadcast.
    $scope.$on('state.update', function(thing, update){
      $scope.showing = update.state;
    });
  });
