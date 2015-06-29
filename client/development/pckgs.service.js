angular.module('packages-ui')
.service('pckgs', [
		'$http',
		'$q',
		function($http, $q) {
			'use strict';

			this.get = function get(key) {
				return $q(function(resolve, reject) {
					$http
						.get('/pckgs/' + encodeURIComponent(key))
						.success(function(pckg) {
							resolve(pckg);
						})
						.error(reject);
				});
			};

			this.getAll = function getAll() {
				return $q(function(resolve) {
					$http
						.get('/pckgs')
						.success(function(pckgs) {
							resolve(pckgs);
						});
				});
			};

			this.post = function post(key, pckg) {
				return $q(function(resolve) {
					$http
						.post('/pckgs/' + encodeURIComponent(key), pckg)
						.success(function(pckg) {
							resolve(pckg);
						});
				});
			};

			this.remove = function remove(key) {
				return $q(function(resolve) {
					$http
						.delete('/pckgs/' + encodeURIComponent(key))
						.success(function(pckg) {
							resolve(pckg);
						});
				});
			};
		}
	]);
