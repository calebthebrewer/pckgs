angular.module('kaskade')
	.controller('kaskade', [
		'$scope',
		'$state',
		'pckgs',
		'scripts',
		'path',
		function ($scope, $state, pckgs, scripts, path) {
			'use strict';

			$scope.path = path.path;
			$scope.files = ['..'].concat(path.files);

			if (path.package) {
				$scope.package = path.package;

				pckgs
					.get(path.path)
					.then(function() {
						$scope.added = true;
					})
					.catch(function() {
						$scope.added = false;
					});
			}

			$scope.browse = function browse() {
				$state.go('kaskade', {path: $scope.path});
			};

			$scope.addPackage = function addPackage() {
				pckgs
					.post(path.path, {
						name: path.package.name
					})
					.then(function() {
						$scope.added = true;
					});
			};
		}
	]);
