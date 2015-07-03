angular.module('packages')
	.controller('package', [
		'$scope',
		'scripts',
		'socketFactory',
		'packages',
		'pckg',
		'npm',
		'bower',
		'readme',
		function($scope, scripts, socketFactory, packages, pckg, npm, bower, readme) {
			'use strict';

			$scope.npm = npm;
			$scope.bower = bower;
			$scope.readme = readme;

			$scope.output = {};

			// helpers
			if (!npm.scripts.install) {
				npm.scripts.install = 'npm install';
			}

			addPckgScriptsToScope();

			$scope.npmScript = function npmScript(script) {
				var scriptSocket = socketFactory({
					ioSocket: io.connect('http://localhost:4000')
				});

				var channel = pckg.path + ':' + script;

				scriptSocket.emit('script', {
					path: pckg.path,
					command: npm.scripts[script],
					channel: channel
				});

				$scope.output[script] = [];

				scriptSocket.on(channel, function(output) {
					output.forEach(function(datum) {
						if (datum) {
							$scope.output[script].push(datum);
						}
					});
				});

				scriptSocket.on('done', function(channel) {
					scriptSocket.removeListener(channel);
				});
			};

			$scope.addScript = function addScript() {
				if (!pckg.scripts) pckg.scripts = {};
				pckg.scripts[$scope.newScript.label] = $scope.newScript.command;
				packages.add(pckg.path, pckg);

				addPckgScriptsToScope();
				$scope.newScript = {};
			};

			function addPckgScriptsToScope() {
				for (var script in pckg.scripts) {
					npm.scripts[script] = pckg.scripts[script];
				}
			}
		}
	]);
