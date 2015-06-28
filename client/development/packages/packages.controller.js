angular.module('packages')
	.controller('packages', [
		'$scope',
		'$state',
		'packages',
		function ($scope, $state, packages) {
			'use strict';

			$scope.packageOpen = true;

			packages
				.paths()
				.success(function(paths) {
					$scope.packages = paths;
				});

			$scope.addPackage = function addPackage() {
				packages.add($scope.newPackage);
				$scope.newPackage = false;
			};
		}
	]);
