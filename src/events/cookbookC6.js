// use controlAs syntax
//angular.module('chapter6', []).controller('HomeCtrl',function($scope) {
//  var self = this;
//  self.showWuEmcee = function(emceeName) {
//    $scope.$broadcast('showWuEmcee', emceeName);
//  };
//
//  return self;
//});

angular.module('chapter6', []).controller('HomeCtrl',function($scope) {

  $scope.UNKNOWN_NAME = 'Unknown emcee';
  $scope.showWuEmcee = function(emceeName) {
    $scope.$broadcast('showWuEmcee', emceeName);
  };
  $scope.onShowWuEmcee = function(e, emceeName) {
    if (!emceeName) {
      $scope.wuWho = $scope.UNKNOWN_NAME;
      return;
    }
    $scope.wuWho = emceeName;
  }
  $scope.$on('showWuEmcee', $scope.onShowWuEmcee);

})
  .directive('wuTang', function($window) {
    return {
      restrict: 'A',
      link: function(scope, element) {
        scope.canPlay = false;
        angular.element($window).on('oncanplay', function() {
          scope.canPlay = true;
        });
      }
    };
  })
  .factory('jwplayer', function() {
    return function() {
      return {
        onReady: function(callback) {
          return callback;
        }
      }
    };
  })
  .directive('jwplayer', function(jwplayer) {
    return {
      restrict: 'EA',
      link: function(scope, element) {
        scope.ready = false;
        jwplayer().onReady(scope.readyHandler);
        scope.readyHandler = function() {
          scope.ready = true;
        }
      }
    };
  });

