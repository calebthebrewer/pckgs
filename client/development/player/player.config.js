angular.module('player')
	.config([
		'$stateProvider',
		function ($stateProvider) {
			'use strict';

			$stateProvider
				.state('player', {
					url: '/player',
					templateUrl: 'player/player.tpl.html',
					controller: 'player',
					resolve: {
						teamPlayers: [
							'teams',
							function(teams) {
								return teams.getAll();
							}
						]
					}
				});
		}]);
