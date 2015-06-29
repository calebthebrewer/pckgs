angular.module('packages-ui')
.service('packages', [
		'$http',
		'$q',
		function($http, $q) {
			'use strict';

			this.get = function cachePackage(path) {
				return $q(function(resolve) {
					$http
						.get('/packages/' + path)
						.success(function(npmPackage) {
							resolve(npmPackage);
						});
				});
			};

			this.add = function addPackage(path, npmPackage) {
				return $q(function(resolve) {
					$http
						.post('/packages', {
							path: path,
							package: npmPackage
						})
						.success(resolve);
				});
			};

			this.paths = function paths() {
				return $q(function(resolve) {
					$http
						.get('/packages')
						.success(resolve);
				});
			};
		}
	]);
