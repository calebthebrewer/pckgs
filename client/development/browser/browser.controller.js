angular.module('browser')
	.controller('browser', [
		'$scope',
		'$state',
		'packages',
		'scripts',
		'path',
		function ($scope, $state, packages, scripts, path) {
			'use strict';

			$scope.path = path.path;
			$scope.files = ['..'].concat(path.files);

			if (path.package) {
				$scope.package = path.package;
			}


			$scope.browse = function browse() {
				$state.go('browser', {path: $scope.path});
			};

			$scope.addPackage = function addPackage() {
				packages.add(path.path, path.package);
			};

			$scope.runScript = function runScript(script) {
				scripts.run(path.path, script);
			};

			$scope.added = function() {
				return packages.path().indexOf($scope.path) > -1;
			};
		}
	]);
