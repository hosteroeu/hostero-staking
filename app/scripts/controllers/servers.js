'use strict';

/**
 * @ngdoc function
 * @name anchialeApp.controller:ServersCtrl
 * @description
 * # ServersCtrl
 * Controller of the anchialeApp
 */
angular.module('anchialeApp')
  .controller('ServersCtrl', function($scope, $state, hostsService, DTOptionsBuilder) {
    $scope.nodes = null;
    $scope.filter = '';
    $scope.dt_options = DTOptionsBuilder.newOptions()
      .withDisplayLength(25)
      .withOption('retrieve', true);

    var getServers = function () {
      hostsService.query().$promise.then(function(res) {
        $scope.nodes = [];

        res.forEach(function(host) {
          if (host.user_id !== 'shared') {
            return;
          }

          $scope.nodes.push(host);
        });
      });
    };

    var interval = setInterval(getServers, 60 * 1000);

    getServers();

    this.get_status_icon = function(status) {
      switch (status) {
        case 'started':
          return 'cloud';

        case 'stopped':
          return 'cloud_off';
      }
    };

    $scope.$on('$destroy', function() {
      clearInterval(interval);
    });
  });
