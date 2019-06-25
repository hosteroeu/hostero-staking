'use strict';

/**
 * @ngdoc provider
 * @name anchialeApp.api
 * @description
 * # api
 * Provider in the anchialeApp.
 */
angular.module('anchialeApp')
  .provider('api', function() {
    this.url = '//localhost:8080/';
    //this.url = 'https://api.hostero.eu/';
    this.version = 'v1';

    this.$get = function() {
      return {
        url: this.url,
        version: this.version
      };
    };
  });
