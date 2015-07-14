angular.module('player')
.service('teams', [
		'$http',
		'$q',
		function($http, $q) {
			'use strict';

			this.get = function get(key) {
				return $q(function(resolve, reject) {
					$http
						.get('/teams/' + encodeURIComponent(key))
						.success(function(pckg) {
							resolve(pckg);
						})
						.error(reject);
				});
			};

			this.getAll = function getAll() {
				return $q(function(resolve) {
					$http
						.get('/teams')
						.success(function(teams) {
							resolve(teams);
						});
				});
			};

			this.post = function post(key, pckg) {
				return $q(function(resolve) {
					$http
						.post('/teams/' + encodeURIComponent(key), pckg)
						.success(function(pckg) {
							resolve(pckg);
						});
				});
			};

			this.remove = function remove(key) {
				return $q(function(resolve) {
					$http
						.delete('/teams/' + encodeURIComponent(key))
						.success(function(pckg) {
							resolve(pckg);
						});
				});
			};
		}
	]);
