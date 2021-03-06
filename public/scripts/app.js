'use strict';

var app = angular
  .module('pathleteApp', ['pathleteApp.services','ngRoute']);
  
app.config(function($routeProvider, $locationProvider) {
  $routeProvider
   .when('/', {
    templateUrl: 'views/main.html',
    controller: 'MainCtrl',
  })
   .when('/progress', {
    templateUrl: 'views/progress.html',
    controller: 'ProgressCtrl',
  })
    .when('/progress/everest', {
     templateUrl: 'views/everest.html',
     controller: 'EverestCtrl',
   })
   .when('/progress/lutetia', {
    templateUrl: 'views/lutetia.html',
    controller: 'LutetiaCtrl',
  })
    .when('/progress/usa', {
    templateUrl: 'views/usa.html',
    controller: 'UsaCtrl',
  })
   .when('/achievements', {
    templateUrl: 'views/achievements.html',
    controller: 'AchievementsCtrl',
  });

  $locationProvider.html5Mode({enabled: true, requireBase: false});
});