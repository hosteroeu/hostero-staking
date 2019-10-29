'use strict';

/**
 * @ngdoc function
 * @name anchialeApp.controller:MinersCtrl
 * @description
 * # MinersCtrl
 * Controller of the anchialeApp
 */
angular.module('anchialeApp')
  .controller('MinersCtrl', function($scope, $state, minersService, coinsService, hostsService, DTOptionsBuilder) {
    $scope.miners = null;
    $scope.hosts = hostsService.query();
    $scope.miners_stopped = [];
    $scope.miners_running = [];
    $scope.filter = '';
    $scope.dt_options = DTOptionsBuilder.newOptions()
      .withDisplayLength(25)
      .withOption('retrieve', true);

    $scope.$watch('$viewContentLoaded', function() {
      setTimeout(function() {
        window.$('[data-toggle="tooltip"]').tooltip();
      }, 5000);
    });

    var getMiners = function() {
      minersService.query({
        mode: 'staking'
      }).$promise.then(function(res) {
        // TODO: Link miner to coin in DB (build relation)
        coinsService.query().$promise.then(function(coins) {
          var yesterday = new Date();
          yesterday.setDate(yesterday.getDate() - 1);

          $scope.miners = [];

          res.forEach(function(miner) {
            var updated = Date.parse(miner.updated_at);

            if (miner.status === 'stopped' && updated < yesterday.getTime()) {
              return;
            }

            miner.reward_24h_eur = 0;

            // TODO: Use benchmarks instead of actual miner power?
            if (miner.power) {
              var reward = 0;
              var coin;

              coins.forEach(function(_coin) {
                if (_coin.internal_name === miner.coin) {
                  coin = _coin;
                }
              });

              // DOMINANCE = USER_HASHES / GLOBAL_HASHES / * 100
              // REWARD_PER_DAY = BLOCK_REWARD * 3600 * 24 / BLOCK_TIME * DOMINANCE / 100
              var dominance = miner.power / coin.network_hashrate / 100;
              var reward_coins = coin.block_reward * 3600 * 24 / coin.block_time * dominance * 100;

              reward = coin.price_eur * reward_coins;

              if (coin.hybrid) {
                reward = reward * coin.hybrid_percentage_pow / 100;
              }

              miner.reward_24h_eur = reward.toFixed(2);
            }

            $scope.miners.push(miner);
          });

          $scope.miners.forEach(function(miner) {
            if (miner.status === 'stopped') {
              $scope.miners_stopped.push(miner);
            } else {
              $scope.miners_running.push(miner);
            }
          });
        });
      });
    };

    var interval = setInterval(getMiners, 60 * 1000);

    getMiners();

    this.get_status_color = function(miner) {
      var color = 'success';

      if (miner.temporary) {
        color = '';
      }

      return color;
    };

    this.get_status_icon = function(miner) {
      var icon;

      switch (miner.status) {
        case 'started':
          icon = 'plug';
          break;

        case 'stopped':
          icon = 'power-off';
          break;
      }

      return icon;
    };

    this.get_name = function(miner) {
      var name = 'miner#' + miner.id;

      if (miner.name.indexOf('miner-') === -1) {
        name = miner.name;
      }

      return name;
    };

    this.open_url = function(instance) {
      var account = JSON.parse(localStorage.getItem('account'));

      window.open('//' + instance.name + '.' + account.name + '.wordpress.hoste.ro');
    };

    this.delete_all = function() {
      if (window.confirm('Do you want to delete all miners?')) {
        $scope.miners.forEach(function(miner) {
          if (!miner.temporary) {
            minersService.remove({
              id: miner.id
            });
          }
        });

        setTimeout(function() {
          window.toastr.info('Deleting all the miners...');
          $state.reload();
        }, 2000);
      }
    };

    this.redeploy = function(miner) {
      minersService.remove({
        id: miner.id
      });

      hostsService.remove({
        id: miner.host_id
      });

      window.toastr.info('Re-deploying started... It will take several minutes');

      setTimeout(function() {
        if ($state.current.name === 'miners') {
          $state.reload();
        } else {
          $state.go('miners');
        }
      }, 2000);
    };

    this.logs = function(miner) {
      window.toastr.info('Getting logs for miner ' + miner.name);

      minersService.get({
        id: miner.id,
        controller: 'logs'
      }).$promise.then(function(data) {
        if (data.ws) {
          var token = data.ws.split('token=');

          if (token && token.length > 1 && token[1] && token[1] !== 'undefined') {
            window.open('http://staking.hostero.eu/#!/logs/' + token[1]);
          } else {
            window.toastr.error('Logs can not be retrieved at this time');
          }
        }
      });
    };

    this.remove = function(miner) {
      if (window.confirm('Do you want to delete ' + miner.name + '?')) {
        minersService.remove({
          id: miner.id
        }).$promise.then(function() {
          window.toastr.success('Miner has been deleted');

          if ($state.current.name === 'miners') {
            $state.reload();
          } else {
            $state.go('miners');
          }

          if (miner.Host && miner.Host.user_id === 'shared') {
            return;
          }

          hostsService.update({
              id: miner.host_id
            }, {
              deployed: '0'
            }).$promise
            .then(console.log)
            .catch(console.error);
        });
      }
    };

    $scope.$on('$destroy', function() {
      clearInterval(interval);
    });
  });
