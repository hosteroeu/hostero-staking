'use strict';

/**
 * @ngdoc factory
 * @name anchialeApp.payments
 * @description
 * # payments
 * Service in the anchialeApp.
 */
angular.module('anchialeApp')
  .factory('paymentsService', function($resource, api) {
    return $resource(api.url + api.version +
      '/payments/:id/:controller/:verb/:action', {
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
