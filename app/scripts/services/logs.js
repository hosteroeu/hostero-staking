'use strict';

/**
 * @ngdoc factory
 * @name anchialeApp.logs
 * @description
 * # logs
 * Service in the anchialeApp.
 */
angular.module('anchialeApp')
  .factory('logsService', function($resource, api) {
    return $resource(api.url + api.version +
      '/logs/:id/:controller/:verb/:action', {
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
