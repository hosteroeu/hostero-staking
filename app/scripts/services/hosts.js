'use strict';

/**
 * @ngdoc factory
 * @name anchialeApp.hosts
 * @description
 * # hosts
 * Service in the anchialeApp.
 */
angular.module('anchialeApp')
  .factory('hostsService', function($resource, api) {
    return $resource(api.url + api.version +
      '/hosts/:id/:controller/:verb/:action', {
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
