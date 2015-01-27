'use strict';

/**
 * @ngdoc overview
 * @name pathleteApp
 * @description
 * # pathleteApp
 *
 * Main module of the application.
 */
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
  });

  $locationProvider.html5Mode({enabled: true, requireBase: false});
});