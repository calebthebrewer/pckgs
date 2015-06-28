angular.module('packages-ui')
	.config([
		'$urlRouterProvider',
		function ($urlRouterProvider) {
			'use strict';

			$urlRouterProvider
				.otherwise('/');
		}]);
