'use strict';

/**
 * @ngdoc function
 * @name anchialeApp.controller:EventsCtrl
 * @description
 * # EventsCtrl
 * Controller of the anchialeApp
 */
angular.module('anchialeApp')
  .controller('EventsCtrl', function($scope, logsService) {
    logsService.query().$promise.then(function(data) {
      $scope.events = data;
    });
  });
