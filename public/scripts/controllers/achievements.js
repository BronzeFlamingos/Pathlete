'use strict';

/**
 * @ngdoc function
 * @name pathleteApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the pathleteApp
 */
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

          $scope.getPercent = function(goal, progress){
            if((progress/goal) < 1){
              return progress/goal * 100;
            } else{
              return 100;
            }
          }
          $scope.userInfo = user;
          $scope.totalSteps = user.stats.lifetime.total.steps;
          $scope.totalFlights = user.stats.lifetime.total.floors;

          $scope.achievements = [{
            name: 'First Steps',
            description:'Walk across the Golden Gate Bridge!',
            goal: 3400,
            unit:'steps',
            width: $scope.getPercent(3400, $scope.totalSteps),
            // width: ($scope.totalFlights/2900)*100 < 100 ? ($scope.totalFlights/2900)*100 : 100,
            current: $scope.totalSteps

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
            description:'Test ',
            goal: 290,  
            unit: 'flights',
            width: $scope.getPercent(290, $scope.totalFlights),
            current: $scope.totalFlights
          },
          {
            name: 'Everest Challenge',
            description:'Climb 2900 flights of stairs!',
            goalSteps: 2900,
            unit: 'flights',
            width: $scope.getPercent(2900, $scope.totalFlights),
            current: $scope.totalFlights      

          },
          {
            name: 'Walk Across America',
            description:'Trek from SF to NY!',
            goalSteps: 5146000,
            unit: 'steps',
            width: $scope.getPercent(5146000, $scope.totalSteps),
            current: $scope.totalSteps
          }
          ]

          console.log($scope.achievements);
          
          
          //get total stairs    
        });
    }
    $scope.getUserInfo();




    
  });