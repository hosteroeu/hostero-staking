'use strict';

/**
 * @ngdoc function
 * @name anchialeApp.controller:CoinsCtrl
 * @description
 * # CoinsCtrl
 * Controller of the anchialeApp
 */
angular.module('anchialeApp')
  .controller('CoinsCtrl', function($scope, coinsService) {
    $scope.coins = coinsService.query({
      on_hostero: 1
    });
  });
