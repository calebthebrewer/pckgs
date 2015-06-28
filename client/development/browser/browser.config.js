angular.module('browser')
	.config([
		'$stateProvider',
		function ($stateProvider) {
			'use strict';

			$stateProvider
				.state('browser', {
					url: '/browse?path',
					templateUrl: 'browser/browser.tpl.html',
					controller: 'browser',
					resolve: {
						path: [
							'$stateParams',
							'browser',
							function($stateParams, browser) {
								return browser.browse($stateParams.path || false);
							}]
					}
				});
		}]);
