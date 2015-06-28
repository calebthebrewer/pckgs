angular.module('scripts')
	.service('scripts', [
		'$http',
		function ($http) {
			'use strict';

			this.run = function run(path, script) {
				$http.post('/scripts', {
					path: path,
					script: script
				});
			};
		}]);
