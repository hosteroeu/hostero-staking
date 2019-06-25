'use strict';

/**
 * @ngdoc factory
 * @name anchialeApp.accounts
 * @description
 * # accounts
 * Service in the anchialeApp.
 */
angular.module('anchialeApp')
  .factory('accountsService', function($resource, api) {
    return $resource(api.url + api.version +
      '/accounts/:id/:controller/:verb/:action', {
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
