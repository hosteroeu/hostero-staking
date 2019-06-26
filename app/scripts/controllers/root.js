'use strict';

/**
 * @ngdoc function
 * @name anchialeApp.controller:RootCtrl
 * @description
 * # RootCtrl
 * Controller of the anchialeApp
 */
angular.module('anchialeApp')
  .controller('RootCtrl', function($scope, $rootScope, $state, hostsService, minersService, coinsService, accountsService, logsService) {
    var token = localStorage.getItem('token');

    $scope.isAuthenticated = false;
    $rootScope.minimalLayout = false;
    $scope.global_state = $state;

    // TODO: Don't make API calls from the root controller, it's not cool, use
    // another controller

    if (token) {
      $scope.isAuthenticated = true;
      $scope.total_power = 0;
      $scope.profile = JSON.parse(localStorage.getItem('profile')) || {};
      $rootScope.global_account = JSON.parse(localStorage.getItem('account')) || {};

      if ($rootScope.minimalLayout === false) {
        hostsService.query().$promise.then(function(res) {
          $scope.global_servers = [];

          res.forEach(function(host) {
            if (host.user_id === 'shared') {
              $scope.global_servers.push(host);
            }
          });
        });

        $scope.global_coins = coinsService.query({
          on_staking: 1
        });

        $scope.global_events = logsService.query();

        minersService.query({
          mode: 'staking'
        }).$promise.then(function(res) {
          $scope.global_miners = [];

          res.forEach(function(miner) {
            if (!miner.temporary) {
              $scope.global_miners.push(miner);
              $scope.total_power += parseInt(miner.power) || 0;
            }
          });
        });
      }
    }
  });
