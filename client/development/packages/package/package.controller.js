angular.module('packages')
	.controller('package', [
		'$scope',
		'scripts',
		'pckg',
		'npm',
		'bower',
		'readme',
		function($scope, scripts, pckg, npm, bower, readme) {
			'use strict';

			$scope.npm = npm;
			$scope.bower = bower;
			$scope.readme = readme;

			$scope.output = {};

			// helpers
			if (!npm.scripts.install) {
				npm.scripts.install = 'npm install';
			}

			$scope.npmScript = function npmScript(script) {
				scripts
					.run(npm.scripts[script], pckg.path)
					.then(function(output) {
						$scope.output[script] = output;
					});
			};
		}
	]);
