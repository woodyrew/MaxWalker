'use strict';
console.log('main.js');

angular.module('maxWalkerApp', ['LocalStorageModule']) // 
.controller('MainCtrl', [
	'$scope',
	'$timeout',
	'localStorageService',
	function ($scope, $timeout) { //, localStorageService
		var onTimeout = function () {
				$scope.tasks[$scope.activeTimerID].timeSoFar += 1e3; //milliseconds in a second
				// localStorageService.add('storedTasks', 7000);
				// Call yourself
				mytimeout = $timeout(onTimeout, 1e3);
			},
			storedTasks = 80000, // localStorageService.get('storedTasks');
			mytimeout;

		$scope.tasks = [{id: 0, timeSoFar: storedTasks, description: 'default'}];
		$scope.activeTimerID = 0;
console.log($scope.tasks[$scope.activeTimerID].timeSoFar);

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
	}
]);
