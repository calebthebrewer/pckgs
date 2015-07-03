angular.module('packages')
	.controller('package', [
		'$scope',
		'scripts',
		'socketFactory',
		'pckg',
		'npm',
		'bower',
		'readme',
		function($scope, scripts, socketFactory, pckg, npm, bower, readme) {
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
				var scriptSocket = socketFactory({
					ioSocket: io.connect('http://localhost:4005')
				});

				scriptSocket.emit('script', {
					path: pckg.path,
					command: npm.scripts[script]
				});

				$scope.output[script] = [];

				scriptSocket.on('output', function(output) {
					output.forEach(function(datum) {
						if (datum) {
							$scope.output[script].push(datum);
						}
					});
				});
			};
		}
	]);
