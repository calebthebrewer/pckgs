angular.module('player')
	.config([
		'$stateProvider',
		function ($stateProvider) {
			'use strict';

			$stateProvider
				.state('player.team', {
					url: '/player/:team',
					templateUrl: 'player/team/team.tpl.html',
					resolve: {
						team: [
							'$stateParams',
							'teams',
							function($stateParams, teams) {
								return teams.get($stateParams.team);
							}
						]
					}
				});
		}]);
