angular.module('packages')
	.controller('package', [
		'$scope',
		'scripts',
		'pckgs',
		'pckg',
		'npm',
		'bower',
		'readme',
		function($scope, scripts, pckgs, pckg, npm, bower, readme) {
			'use strict';

			$scope.npm = npm;
			$scope.bower = bower;
			$scope.readme = readme;

			$scope.output = {};
			resetNewEnvironment();

			// helpers
			if (!pckg.scripts) {
				pckg.scripts = {
					install: 'npm install'
				};
			}
			if (!pckg.environments) {
				pckg.environments = {};
			}

			addPckgScriptsToScope();

			$scope.environments = pckg.environments;

			$scope.npmScript = function npmScript(script) {
				var channel = pckg.path + ':' + script;

				scripts.socket.emit('script', {
					path: pckg.path,
					command: npm.scripts[script],
					channel: channel
				});

				$scope.output[script] = [];

				scripts.socket.on(channel, function(output) {
					output.forEach(function(datum) {
						if (datum) {
							$scope.output[script].push(datum);
						}
					});
				});

				scripts.socket.on('done', function(channel) {
					scripts.socket.removeListener(channel);
				});
			};

			$scope.addScript = function addScript() {
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
