'use strict';
console.log('app.js');
angular.module('maxWalkerApp')
	.config(function ($routeProvider) {
		console.log('app.js', 'config');
		$routeProvider
			.when('/', {
				templateUrl: 'views/main.html',
				controller: 'MainCtrl'
			})
			.otherwise({
				redirectTo: '/'
			});
	});
