angular.module('kaskade')
	.service('kaskade', [
		'$http',
		'$q',
		function ($http, $q) {
			'use strict';

			this.browse = function browse(path) {
				var d = $q.defer();
				path = path ? '?path=' + encodeURIComponent(path) : '';
				$http.get('/browse' + path)
					.success(function(path) {
						d.resolve(path);
					});

				return d.promise;
			};
		}]);
