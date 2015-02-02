'use strict';

/**
 * @ngdoc function
 * @name pathleteApp.controller:LutetiaCtrl
 * @description
 * # calculates distance user has traveled across lutetia and converts it into pixels
 * Controller of the pathleteApp
 */
app.controller('LutetiaCtrl', function ($scope, $http, Info, Tool) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    //user info
    $scope.userInfo

    //ensures toolbar is on
    Tool.toolbarOn();

    //distance in pixels
    $scope.distance = 0;

    $scope.getUserInfo = function(){
      Info.getInfo()
        .then(function(user){
          $scope.userInfo = user;
          var farness = (user.stats.lifetime.total.distance/150)*700;
          if (farness>700) {
            $scope.distance = 700;
          } else {
            $scope.distance = farness;
          }
        });
    }
    $scope.getUserInfo();
  });