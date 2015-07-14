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
				$scope.packageOpen = !$state.is('packages');
			});

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
