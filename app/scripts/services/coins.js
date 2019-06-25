'use strict';

/**
 * @ngdoc factory
 * @name anchialeApp.coins
 * @description
 * # coins
 * Service in the anchialeApp.
 */
angular.module('anchialeApp')
  .factory('coinsService', function($resource, api) {
    return $resource(api.url + api.version +
      '/coins/:id/:controller/:verb/:action', {
        id: '@id',
        controller: '@controller',
        verb: '@verb',
        action: '@action'
      }, {
        'update': {
          method: 'PUT'
        }
      });
  });
