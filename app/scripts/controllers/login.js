'use strict';

/**
 * @ngdoc function
 * @name anchialeApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the anchialeApp
 */
angular.module('anchialeApp')
  .controller('LoginCtrl', function ($scope, authService) {
    authService.login();
  });
