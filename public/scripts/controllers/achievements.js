'use strict';

app.controller('AchievementsCtrl', function ($scope, $http, Info, Tool) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    Tool.toolbarOn();

    $scope.getUserInfo = function(){
      Info.getInfo()
        .then(function(user){
          $scope.userInfo = user;
          $scope.totalSteps = user.stats.lifetime.total.steps;
          $scope.totalFlights = user.stats.lifetime.total.floors;

          $scope.getPercent = function(goal, progress){  //used to set width of progress in bar
            if((progress/goal) < 1){
              return progress/goal * 100;
            } else{
              return 100;
            }
          };

          $scope.achievements = [{
            name: 'First Steps',
            description:'Walk across the Golden Gate Bridge!',
            goal: 3400,
            unit:'steps',
            width: $scope.getPercent(3400, $scope.totalSteps),
            // width: ($scope.totalFlights/2900)*100 < 100 ? ($scope.totalFlights/2900)*100 : 100,
            current: $scope.totalSteps, 
            backgroundimage: "url(../images/'GoldenGateBridge.jpg')"
          },
          {
            name: 'Bay to Breakers',
            description:'Get from AT&T Park to Lands End!',
            goal: 15000,
            unit:'steps',
            width: $scope.getPercent(15000, $scope.totalSteps),
            current: $scope.totalSteps
          }, 
          {
            name: 'Stair Challenge',
            description:'Climb 50 flights of stairs',
            goal: 50,
            unit: 'flights',
            width: $scope.getPercent(50, $scope.totalFlights),
            current: $scope.totalFlights

          },
          {
            name: 'Hike the Burj Khalifa',
            description:'Climb the worlds tallest building!',
            goal: 290,  
            unit: 'flights',
            width: $scope.getPercent(290, $scope.totalFlights),
            current: $scope.totalFlights
          },
          {
            name: 'Everest Challenge',
            description:'Climb 2900 flights of stairs!',
            goal: 1200,
            unit: 'flights',
            width: $scope.getPercent(1200, $scope.totalFlights),
            current: $scope.totalFlights      

          },
          {
            name: 'Walk Across America',
            description:'Trek from SF to NY!',
            goal: 5146000,
            unit: 'steps',
            width: $scope.getPercent(5146000, $scope.totalSteps),
            current: $scope.totalSteps
          }
          ]          
          
          //get total stairs    
        });
    }
    $scope.getUserInfo();




    
  });
