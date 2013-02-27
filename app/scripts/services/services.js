/** /
angular.module('MaxWalkerApp', ['ngResource']).
    factory('Phone', function($resource, $scope){
  return $resource('phones/:phoneId.json', {}, {
    query: {method:'GET', params:{phoneId:'phones'}, isArray:true}
  });
});/**/

/* Filters */
/*
angular.module('MaxWalkerApp', []).filter('time', function() {
  return function(input) {
    return input ? '\u2713' : '\u2718';
  };
});
*/