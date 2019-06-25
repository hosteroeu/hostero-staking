'use strict';

/**
 * @ngdoc function
 * @name anchialeApp.filter:password
 * @description
 * # Password
 * Filter of the anchialeApp
 */
angular.module('anchialeApp')
  .filter('password', function() {
    return function(input) {
      return Array(input.length + 1).join('*');
    };
  });
