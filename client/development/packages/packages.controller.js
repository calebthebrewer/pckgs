angular.module('packages')
	.controller('packages', [
		'$scope',
		'$state',
		'packages',
		function ($scope, $state, packages) {
			'use strict';

			$scope.packageOpen = !$state.is($state.current);

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
