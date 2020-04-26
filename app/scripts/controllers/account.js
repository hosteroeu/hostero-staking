'use strict';

/**
 * @ngdoc function
 * @name anchialeApp.controller:AccountCtrl
 * @description
 * # AccountCtrl
 * Controller of the anchialeApp
 */
angular.module('anchialeApp')
  .controller('AccountCtrl', function($scope, accountsService) {
    var account = JSON.parse(localStorage.getItem('account'));

    $scope.profile = JSON.parse(localStorage.getItem('profile'));

    accountsService.get({
      id: account.id
    }).$promise.then(function(_account) {
      $scope.account = _account;

      localStorage.setItem('account', JSON.stringify(_account));

      switch (_account.plan_miners_staking) {
        case 0:
          $scope.plan = 'free';
          break;
        case 1:
          $scope.plan = 'hobby';
          break;
        case 5:
          $scope.plan = 'miner';
          break;
        case 25:
          $scope.plan = 'farm';
          break;
        case -1:
          $scope.plan = 'unlimited';
          break;
        default:
          $scope.plan = 'custom';
      }
    });
  });
