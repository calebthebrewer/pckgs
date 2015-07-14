angular.module('player')
	.controller('player', [
		'$scope',
		'$state',
		'teams',
		'teamPlayers',
		function ($scope, $state, teams, teamPlayers) {
			'use strict';

			$scope.teams = teamPlayers;

			$scope.addTeam = function addTeam() {
				var teamName = $scope.newTeamName;
				$scope.newTeamName = '';

				teams.post(teamName, {name: teamName});
				$scope.teams.push({name: teamName});
				$state.go('player.team', {team: teamName});
			};
		}
	]);
