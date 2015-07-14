angular.module('team')
	.config([
		'$stateProvider',
		function ($stateProvider) {
			'use strict';

			$stateProvider
				.state('player.team', {
					url: '/:team',
					templateUrl: 'player/team/team.tpl.html',
					controller: 'team',
					resolve: {
						team: [
							'$stateParams',
							'teams',
							function($stateParams, teams) {
								return teams.get($stateParams.team);
							}
						],
						packages: [
							'pckgs',
							function(pckgs) {
								return pckgs.getAll();
							}
						]
					}
				});
		}]);
