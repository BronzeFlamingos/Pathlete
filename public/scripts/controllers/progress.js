'use strict';

/**
 * @ngdoc function
 * @name pathleteApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the pathleteApp
 */
app.controller('ProgressCtrl', function ($scope, $http, Info, Tool) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    //user info
    $scope.userInfo

    Tool.toolbarOn();

    $scope.placeholderSize = 300;

    $scope.getUserInfo = function(){
      Info.getInfo()
        .then(function(user){
          console.log(user);
          $scope.userInfo = user;
        });
    }
    $scope.getUserInfo();
  });