angular.module('packages')
	.controller('packages', [
		'$scope',
		'$rootScope',
		'$state',
		'pckgs',
		function ($scope, $rootScope, $state, pckgs) {
			'use strict';

			$scope.packageOpen = !$state.is('packages');
			$rootScope.$on('$locationChangeSuccess', function() {
				$scope.packageOpen = !$state.is('packages');
			});

			pckgs
				.getAll()
				.then(function(paths) {
					$scope.packages = paths;
				});

			$scope.addPackage = function addPackage() {
				pckgs.post($scope.newPackage);
				$scope.newPackage = false;
			};
		}
	]);
