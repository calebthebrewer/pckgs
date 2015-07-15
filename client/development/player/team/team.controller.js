angular.module('team')
.controller('team', [
		'$scope',
		'$state',
		'teams',
		'files',
		'scripts',
		'packages',
		'team',
		function($scope, $state, teams, files, scripts, packages, team) {
			'use strict';

			$scope.pckgs = _.pluck(packages, 'name');

			setLines();
			$scope.team = team;


			$scope.removeTeam = function removeTeam() {
				teams.remove(team.name);
				$state.go('player', {}, {reload: true});
			};

			$scope.addPlayer = function addPlayer(line, newPlayerName) {
				var player = _.find(packages, {name: newPlayerName});

				if (!player) {
					return;
				}

				if (!player.scripts) {
					player.scripts = {};
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

			var channels = {};


			$scope.play = function play(player) {
				player.status = 'playing';
				player.channel = player.path + ':' + player.script;
				channels[player.channel] = player;

				scripts.socket.emit('script', {
					path: player.path,
					command: player.script,
					environment: player.environment,
					channel: player.channel
				});

				scripts.socket.on(player.channel, function(output) {
					output.forEach(function(datum) {
						if (datum) {
							console.info(datum);
						}
					});
				});
			};

			scripts.socket.on('done', function(channel) {
				channels[channel].status = 'stopped';
				delete channels[channel];
			});

			$scope.stop = function stop(player) {
				player.status = 'stopped';

				scripts.socket.emit('kill', player.channel);
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
