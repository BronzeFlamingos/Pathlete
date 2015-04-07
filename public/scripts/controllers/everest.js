'use strict';

/**
 * @ngdoc function
 * @name pathleteApp.controller:EverestCtrl
 * @description
 * # calculates height user has traveled up everest and converts it into pixels
 * Info and Tool are defined in services.js
 */

app.controller('EverestCtrl', function ($scope, $http, Info, Tool) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    $scope.userInfo

    //ensures toolbar at top is on
    Tool.toolbarOn();

    //distance in pixels
    $scope.distance = 0;


    $scope.getUserInfo = function(){
      Info.getInfo()
        .then(function(user){
          $scope.userInfo = user;
          var farness = 525-(((user.stats.lifetime.total.floors||0)*10)/12129)*395;
          if (farness>700) {
            $scope.distance = 700;
          } else {
            $scope.distance = farness;
          }
        });
    }
    $scope.getUserInfo();
  });
