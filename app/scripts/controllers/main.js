'use strict';

angular.module('MaxWalkerApp')
	.controller('MainCtrl', function ($scope, $timeout) {
		var onTimeout = function () {
				$scope.tasks[$scope.activeTimerID].timeSoFar += 1e3; //milliseconds in a second

				// Call yourself
				mytimeout = $timeout(onTimeout, 1e3);
			},
			mytimeout;

		$scope.tasks = [{id: 0, timeSoFar: 0, description: 'default'}];
		$scope.activeTimerID = 0;

		$scope.timer = {
			state: function () {
				// console.log(typeof mytimeout, mytimeout);
				return (typeof mytimeout === 'object');
			},
			start: function () {
				mytimeout = $timeout(onTimeout, 1e3);
			},
			stop: function () {
				$timeout.cancel(mytimeout);
				mytimeout = undefined; // Unset for the state function to work
			}
		};
		$scope.timer.start(); // Initialse timer

		
		$scope.awesomeThings = [
			'HTML5 Boilerplate',
			'AngularJS',
			'Testacular'
		];
	});
