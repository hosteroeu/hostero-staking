'use strict';

/**
 * @ngdoc factory
 * @name anchialeApp.miners
 * @description
 * # miners
 * Service in the anchialeApp.
 */
angular.module('anchialeApp')
  .factory('minersService', function($resource, api) {
    return $resource(api.url + api.version +
      '/miners/:id/:controller/:verb/:action', {
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
