'use strict';

/**
 * @ngdoc function
 * @name pathleteApp.controller:ToolbarCtrl
 * @description
 * # MainCtrl
 * Controller of the pathleteApp toolbar
 */
app.controller('ToolbarCtrl', function ($scope, $http, Info, Tool) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    $scope.showing = Tool.toolbarShow;

    $scope.$on('state.update', function(thing, update){
      $scope.showing = update.state;
    });

    //user info
    $scope.logout = function(){
      console.log($scope.showing);
      Info.logout();
    }
  });