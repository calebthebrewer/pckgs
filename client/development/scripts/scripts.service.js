angular.module('scripts')
	.service('scripts', [
		'socketFactory',
		function (socketFactory) {
			'use strict';

			var scriptSocket = socketFactory({
				ioSocket: io.connect('process.env.HOST')
			});

			this.socket = scriptSocket;
		}]);
