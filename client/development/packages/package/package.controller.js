angular.module('packages')
	.controller('package', [
		'$scope',
		'scripts',
		'socketFactory',
		'pckgs',
		'pckg',
		'npm',
		'bower',
		'readme',
		function($scope, scripts, socketFactory, pckgs, pckg, npm, bower, readme) {
			'use strict';

			$scope.npm = npm;
			$scope.bower = bower;
			$scope.readme = readme;

			$scope.output = {};
			resetNewEnvironment();

			// helpers
			if (!npm.scripts.install) {
				npm.scripts.install = 'npm install';
			}

			addPckgScriptsToScope();

			$scope.environments = pckg.environments || {};

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
				if (!pckg.scripts) {
					pckg.scripts = {};
				}

				pckg.scripts[$scope.newScript.label] = $scope.newScript.command;
				pckgs.post(pckg.path, pckg);

				addPckgScriptsToScope();
				$scope.newScript = {};
			};

			function addPckgScriptsToScope() {
				for (var script in pckg.scripts) {
					npm.scripts[script] = pckg.scripts[script];
				}
			}

			$scope.addEnvironment = function addEnvironment() {
				if (!pckg.environments) {
					pckg.environments = {};
				}

				pckg.environments[$scope.newEnvironment.name] = $scope.newEnvironment.settings;
				pckgs.post(pckg.path, pckg);

				resetNewEnvironment();
			};

			$scope.removeEnvironment = function removeEnvironment(environment) {
				delete pckg.environments[environment];
				pckgs.post(pckg.path, pckg);
			};

			function resetNewEnvironment() {
				$scope.newEnvironment = {
					settings: [{
						key: '',
						value: ''
					}]
				};
			}
		}
	]);
