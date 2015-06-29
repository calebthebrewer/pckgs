angular.module('packages')
	.controller('packages', [
		'$scope',
		'$rootScope',
		'$state',
		'packages',
		function ($scope, $rootScope, $state, packages) {
			'use strict';

			$scope.packageOpen = !$state.is('packages');
			$rootScope.$on('$locationChangeSuccess', function() {
				$scope.packageOpen = !$state.is('packages');
			});

			packages
				.paths()
				.then(function(paths) {
					$scope.packages = paths;
				});

			$scope.addPackage = function addPackage() {
				packages.add($scope.newPackage);
				$scope.newPackage = false;
			};
		}
	]);
