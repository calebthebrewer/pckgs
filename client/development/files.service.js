angular.module('packages-ui')
	.service('files', [
		'$http',
		'$q',
		function($http, $q) {
			'use strict';

			this.get = function get(path, type) {
				return $q(function(resolve, reject) {
					var typePath = type ? type + '/' : '';
					$http
						.get('/files/' + typePath + encodeURIComponent(path))
						.success(function(file) {
							resolve(file);
						})
						.error(reject);
				});
			};
		}
	]);
