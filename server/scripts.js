var spawn = require('win-spawn');

module.exports = function(app, io) {
	app.get('/scripts/:command/:path', function(req, res) {
		var child = spawn('cd ' + req.params.path + ' && ' + req.params.command);
		var messages = [];

		child.stdout.setEncoding('utf8');

		child.stdout.on('data', function(data) {
			messages = messages.concat(data.split('\n'));
		});

		child.on('close', function() {
			res.send(messages);
		});

		child.on('error', function(error) {
			messages.push(error);
			child.kill();
		});
	});

	io.on('connection', function(socket) {
		socket.on('script', function(script) {
			var child = spawn('cd ' + script.path + ' && ' + script.command);

			child.stdout.setEncoding('utf8');

			child.stdout.on('data', function(data) {
				socket.emit(script.channel, data.split('\n'));
			});

			child.on('close', function() {
				child.kill();
				socket.emit('done', script.channel);
			});

			child.on('error', function(error) {
				child.kill();
				socket.emit(script.channel, error);
			});
		});
	});
};
