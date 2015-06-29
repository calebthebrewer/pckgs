var spawn = require('child_process').exec;

module.exports = function(app) {
	app.get('/scripts/:command/:path', function(req, res) {
		var child = spawn('cd ' + req.params.path + ' && ' + req.params.command);
		var messages = [];

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
};
