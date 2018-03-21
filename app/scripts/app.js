'use strict';

/**
 * @ngdoc overview
 * @name liveCityApp
 * @description
 * # liveCityApp
 *
 * Main module of the application.
 */
angular
  .module('liveCityApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
