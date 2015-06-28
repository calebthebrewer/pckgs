angular.module('packages-ui')
.service('packages', [
		'$http',
		'$q',
		'$cacheFactory',
		function($http, $q, $cacheFactory) {
			'use strict';

			var cache = $cacheFactory('packages');

			this.get = function cachePackage(path) {
				var d = $q.defer();

				var npmPackage = cache.get(path);
				if (npmPackage) {
					d.resolve(npmPackage);
				}
				$http
					.get('/packages/' + path)
					.success(function(npmPackage) {
						cache.put(path, npmPackage);
						d.resolve(npmPackage);
					});

				return d.promise;
			};

			this.add = function addPackage(path, npmPackage) {
				cache.put(path, npmPackage);
				$http
					.post('/packages', {
						path: path,
						package: npmPackage
					});
			};

			this.paths = function paths() {
				return $http.get('/packages');
			};
		}
	]);
