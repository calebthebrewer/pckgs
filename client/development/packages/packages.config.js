angular.module('packages')
	.config([
		'$stateProvider',
		function ($stateProvider) {
			'use strict';

			$stateProvider
				.state('packages', {
					url: '/',
					templateUrl: 'packages/packages.tpl.html',
					controller: 'packages'
				});
		}]);
