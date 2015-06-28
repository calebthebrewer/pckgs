angular.module('packages')
	.controller('package', [
		'$scope',
		'$state',
		'currentPackage',
		function($scope, $state, currentPackage) {
			'use strict';

			$scope.package = currentPackage;
		}
	]);
