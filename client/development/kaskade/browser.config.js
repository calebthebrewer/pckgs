angular.module('kaskade')
	.config([
		'$stateProvider',
		function ($stateProvider) {
			'use strict';

			$stateProvider
				.state('kaskade', {
					url: '/browse?path',
					templateUrl: 'kaskade/kaskade.tpl.html',
					controller: 'kaskade',
					resolve: {
						path: [
							'$stateParams',
							'kaskade',
							function($stateParams, kaskade) {
								return kaskade.browse($stateParams.path || false);
							}]
					}
				});
		}]);
