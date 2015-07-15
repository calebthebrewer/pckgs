'use strict';

var spawn = require('win-spawn');

var scripts = {};
var children = {};

module.exports = function(app, io) {
	io.on('connection', function(socket) {
		socket.on('script', function(script) {
			if (!scripts[script.channel]) {
				scripts[script.channel] = [];
				startScript(io, script);
			}

			// join socket to this script's room
			socket.join(script.channel);
			scripts[script.channel].push(socket);
		});

		socket.on('kill', function(channel) {
			children[channel].kill();
		});
	});
};

function startScript(io, script) {
	var spawnScript = {
		cwd: script.path
	};

	if (script.environment) {
		spawnScript.env = {};
		script.environment.forEach(function(setting) {
			spawnScript.env[setting.key] = setting.value;
		});
	}

	var child = spawn(script.command, [], spawnScript);
	children[script.channel] = child;

	child.stdout.setEncoding('utf8');

	child.stdout.on('data', function(data) {
		io.to(script.channel).emit(script.channel, data.split('\n'));
	});

	child.on('close', function() {
		io.to(script.channel).emit('done', script.channel);
		cleanUp();
	});

	child.on('error', function(error) {
		io.to(script.channel).emit(script.channel, error);
		cleanUp();
	});

	function cleanUp() {
		child.kill();
		scripts[script.channel].forEach(function(socket) {
			socket.leave(script.channel);
		});
		delete scripts[script.channel];
		delete children[script.channel];
	}
}
