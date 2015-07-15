angular.module('player')
	.controller('player', [
		'$scope',
		'$rootScope',
		'$state',
		'teams',
		'teamPlayers',
		function ($scope, $rootScope, $state, teams, teamPlayers) {
			'use strict';

			$scope.teamOpen = !$state.is('player');
			$rootScope.$on('$locationChangeSuccess', function() {
				$scope.teamOpen = !$state.is('player');
			});

			$scope.teams = teamPlayers;

			$scope.addTeam = function addTeam() {
				var team = {
					name: $scope.newTeamName,
					lines: [[]]
				};

				$scope.newTeamName = '';

				teams.post(team.name, team);
				$scope.teams.push(team);
				$state.go('player.team', {team: team.name});
			};
		}
	]);
