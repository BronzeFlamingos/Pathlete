'use strict';

/**
 * @ngdoc function
 * @name pathleteApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the pathleteApp
 */
app.controller('UsaCtrl', function ($scope, $http, Info, Tool) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    //user info
    $scope.userInfo

    Tool.toolbarOn();

    $scope.distance = 0;

    $scope.getUserInfo = function(){
      Info.getInfo()
        .then(function(user){
          $scope.userInfo = user;
          var farness = 50 + (user.stats.lifetime.total.distance/4828)*650;
          if (farness>650) {
            $scope.distance = 650;
          } else {
            $scope.distance = farness;
          }
        });
    }
    $scope.getUserInfo();
  });
