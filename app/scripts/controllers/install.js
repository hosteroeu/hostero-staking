'use strict';

/**
 * @ngdoc function
 * @name anchialeApp.controller:InstallCtrl
 * @description
 * # InstallCtrl
 * Controller of the anchialeApp
 */
angular.module('anchialeApp')
  .controller('InstallCtrl', function ($scope) {
    var account = JSON.parse(localStorage.getItem('account'));
    //var profile = JSON.parse(localStorage.getItem('profile'));
    $scope.account = account;
  });
