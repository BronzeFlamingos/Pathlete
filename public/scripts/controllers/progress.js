'use strict';

app.controller('ProgressCtrl', function ($scope, $http, Info, Tool) {
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