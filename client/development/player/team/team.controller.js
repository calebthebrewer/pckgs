angular.module('team')
.controller('team', [
		'$scope',
		'teams',
		'files',
		'socketFactory',
		'packages',
		'team',
		function($scope, teams, files, socketFactory, packages, team) {
			'use strict';

			var scriptSocket = socketFactory({
				ioSocket: io.connect('process.env.HOST')
			});

			$scope.pckgs = _.pluck(packages, 'name');

			setLines();
			$scope.team = team;

			$scope.addPlayer = function addPlayer(line, newPlayerName) {
				var player = _.find(packages, {name: newPlayerName});

				if (!player) {
					return;
				}

				files
					.get(player.path, 'npm')
					.then(function(npm) {
						for (var label in npm.scripts) {
							if (!player.scripts[label]) {
								player.scripts[label] = npm.scripts[label];
							}
						}

						line.push(player);
						newPlayerName = '';

						saveTeam();
					});
			};

			$scope.removePlayer = function removePlayer(line, index) {
				line.splice(index, 1);

				saveTeam();
			};

			$scope.play = function play(player) {
				player.status = 'playing';

				var channel = player.path + ':' + player.script;

				scriptSocket.emit('script', {
					path: player.path,
					command: player.script,
					environment: player.environment,
					channel: channel
				});

				scriptSocket.on(channel, function(output) {
					output.forEach(function(datum) {
						if (datum) {
							console.info(datum);
						}
					});
				});
			};

			$scope.stop = function stop(player) {
				player.status = 'stopped';
			};

			$scope.addLine = function addLine() {
				team.lines.push([]);

				saveTeam();
			};

			$scope.removeLine = function removeLine(index) {
				team.lines.splice(index, 1);

				setLines();
				saveTeam();
			};

			$scope.saveTeam = saveTeam;

			function saveTeam() {
				teams.post(team.name, team);
			}

			function setLines() {
				if (!team.lines || !team.lines.length) {
					team.lines = [[]];
				}
			}
		}
	]);
