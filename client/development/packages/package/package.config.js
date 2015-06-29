angular.module('packages')
	.config([
		'$stateProvider',
		function ($stateProvider) {
			'use strict';

			$stateProvider
				.state('packages.package', {
					url: 'package/:path',
					templateUrl: 'packages/package/package.tpl.html',
					controller: 'package',
					resolve: {
						pckg: [
							'$stateParams',
							'pckgs',
							function($stateParams, pckgs) {
								return pckgs.get($stateParams.path);
							}
						],
						npm: [
							'$stateParams',
							'files',
							function($stateParams, files) {
								return files.get($stateParams.path, 'npm');
							}
						],
						bower: [
							'$stateParams',
							'files',
							function($stateParams, files) {
								return files.get($stateParams.path, 'bower');
							}
						],
						readme: [
							'$stateParams',
							'files',
							function($stateParams, files) {
								return files.get($stateParams.path, 'readme');
							}
						]
					}
				});
		}]);
