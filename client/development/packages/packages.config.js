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
				})
				.state('packages.package', {
					url: 'package/:name',
					templateUrl: 'packages/package/package.tpl.html',
					controller: 'package',
					resolve: {
						currentPackage: [
							'$stateParams',
							'packages',
							function($stateParams, packages) {
								return packages.get($stateParams.name);
							}
						]
					}
				});
		}]);
