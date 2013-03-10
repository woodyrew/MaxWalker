'use strict';

angular.module('MaxWalkerApp', [])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });

'use strict';

angular.module('MaxWalkerApp')
	.controller('MainCtrl', function ($scope, $timeout) {
		var updateProgress = function (taskID) {
				var activeTimer = $scope.tasks[taskID],
					getPercentage = function (initialTime, timeSoFar) {
						var percentage = 100;
						
						// console.log('getPercentage', initialTime, timeSoFar);
						if (initialTime > 0 && initialTime > timeSoFar) {
							percentage = (timeSoFar / initialTime) * 100;
						}
						return percentage;
					},
					remaining = activeTimer.initialTime - activeTimer.timeSoFar;

				activeTimer.isCountdown = (activeTimer.initialTime > 0);
				activeTimer.remainderClass = (activeTimer.initialTime > 0 && remaining < 0) ? 'text-error' : '';
				activeTimer.timeRemaining = Math.abs(remaining); // Counts up after 0.
				activeTimer.percentage = getPercentage(activeTimer.initialTime, activeTimer.timeSoFar);
			},
			onTimeout = function (taskID) {
				var activeTimer = $scope.tasks[taskID];

				activeTimer.timeSoFar += 1e3; //milliseconds in a second
				updateProgress(taskID);

				// Call yourself
				$scope.tasks[taskID].timeout = $timeout(function() {
					onTimeout(taskID);
				}, 1e3);
			};

		$scope.tasks = [
			{id: 0, initialTime: 1800e3, timeRemaining: 0, timeSoFar: 0, description: 'Main Task'},
			{id: 1, initialTime: 0, timeRemaining: 0, timeSoFar: 0, description: 'Alternative'}
		];
		$scope.activeTimerID = 0;

		$scope.timer = {
			state: function (taskID) {
				var stateTimeout = $scope.tasks[taskID].timeout;
				
				// console.log('state', taskID, typeof stateTimeout, stateTimeout);
				return (typeof stateTimeout === 'object');
			},
			start: function (taskID) {
				// Stop any other timers
				$scope.tasks.forEach(function (element, index) {
					$scope.timer.stop(element.id);
				});

				// Start timer
				$scope.tasks[taskID].timeout = $timeout(function() {
					onTimeout(taskID);
				}, 1e3);
			},
			stop: function (taskID) {
				var stopTimeout = $scope.tasks[taskID].timeout;
				
				// Cancel the timer
				$timeout.cancel(stopTimeout);
				delete $scope.tasks[taskID].timeout; // Unset for the state function to work
			},
			reset: function (taskID) {
				$scope.tasks[taskID].timeSoFar = 0;
				updateProgress(taskID);
			},
			progressClass: function (taskID) {
				var task = $scope.tasks[taskID],
					classes = ['progress', 'progress-striped'];

				if (this.state(taskID)) {
					classes.push('active');
				}
				if (task.initialTime > 0) {
					if (task.initialTime > task.timeSoFar) {
						if (task.percentage < 90) {
							classes.push('progress-success');
						}
						else {
							classes.push('progress-warning');
						}
					}
					else {
						classes.push('progress-danger');
					}
				}

				return classes.join(' ');
			}
		};
	});