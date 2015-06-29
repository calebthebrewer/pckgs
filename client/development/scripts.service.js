angular.module('packages-ui')
	.service('scripts', [
		'$http',
		'$q',
		function($http, $q) {
			'use strict';

			this.run = function get(command, path) {
				return $q(function(resolve, reject) {
					$http
						.get('/scripts/' + encodeURIComponent(command) + '/' + encodeURIComponent(path))
						.success(function(output) {
							resolve(output);
						})
						.error(reject);
				});
			};
		}
	]);
